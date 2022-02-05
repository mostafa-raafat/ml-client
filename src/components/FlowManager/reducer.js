const uninitializedVariablesValue = '';

/**
 * this function allows to initialize the contexts looking at
 * the `setters` section of the step, giving the default value to the
 * variables or setting the default value the user needs
 */
const initContextFromOptionalSetters = (el) =>
  'setters' in el
    ? Object.keys(el.setters).reduce((acc, setterKey) => {
        if (setterKey === 'variables') {
          return {
            ...acc,
            ...el.setters.variables.reduce((innerAcc, varname) => {
              // 'value' .... just s tring  => value = null
              return typeof varname === 'string'
                ? {
                    ...innerAcc,
                    [varname]: uninitializedVariablesValue,
                  }
                : // else  {value1: 1, value2: 3}
                  {
                    ...innerAcc,
                    ...Object.keys(varname).reduce((iiacc, n) => {
                      return { ...iiacc, [n]: varname[n] };
                    }, {}),
                  };
            }, {}),
          };
        }
        // setterKey : name
        // but exclude alien contexts
        if (typeof el.setters[setterKey] === 'string') {
          return el.setters[setterKey].search(/\./) === -1
            ? {
                ...acc,
                [el.setters[setterKey]]: uninitializedVariablesValue,
              }
            : acc;
        } // OR setterKey : {name : initvalue}
        // for the moment I trust is an object, but needs to be checked,
        // at least to let the user know if something wrong is passed
        const k = Object.keys(el.setters[setterKey])[0];
        return {
          ...acc,
          [k]: el.setters[setterKey][k],
        };
      }, {})
    : {};

const init = ({ steps, wrapper = {} }) => {
  const first = steps.findIndex((step) => !('active' in step) || !!step.active);
  return {
    steps,
    changed: false,
    stepIndex: first,
    firstActiveIndex: first,
    lastActiveIndex: steps.reduce((acc, step, i) => {
      if (!('active' in step) || !!step.active) return Math.max(acc, i);
      return acc;
    }, -1),
    loading: false,
    activeSteps: steps.map((step) => ('active' in step ? !!step.active : true)),
    visitedSteps: [true, ...new Array(steps.length - 1).fill(false)],
    stepsCount: steps.filter((step) => !('active' in step) || !!step.active).length,
    contexts: {
      ...steps.reduce((acc, step, i) => {
        acc[step.stateContext || `context${i}`] = initContextFromOptionalSetters(step);
        return acc;
      }, {}),
      wrapper: initContextFromOptionalSetters(wrapper),
    },
  };
};

// eslint-disable-next-line complexity
const reducer = (oldState, action) => {
  const { payload, type } = action;
  const skipInactive = (versus) => {
    let newIndex = oldState.stepIndex;
    do {
      newIndex += versus;
    } while (!oldState.activeSteps[newIndex]);
    return newIndex;
  };
  switch (type) {
    case 'close': {
      return {
        ...oldState,
        empty: true,
        loading: false,
      };
    }
    case 'reset': {
      return init(payload);
    }
    case 'loading': {
      return {
        ...oldState,
        loading: true,
      };
    }
    case 'addComponentStateEntry': {
      /**
       * might be that from one component context we want to
       * have a setter able to change a value in another component context
       */
      const alienCtx = payload.name.match(/(.*)\.(.*)/);
      const context = alienCtx ? alienCtx[1] : payload.context;
      const name = alienCtx ? alienCtx[2] : payload.name;
      return {
        ...oldState,
        changed: true,
        contexts: {
          ...oldState.contexts,
          [context]: {
            ...oldState.contexts[context],
            [name]: payload.value,
          },
        },
      };
    }
    case 'moveNext': {
      const { lastActiveIndex, stepIndex, steps, visitedSteps } = oldState;

      const nextIndex = payload && 'next' in payload ? Math.min(payload.next, lastActiveIndex) : skipInactive(+1);

      const newContexts = Object.keys(oldState.contexts).reduce((acc, ctx, i) => {
        if (ctx !== 'wrapper') {
          if ((i === stepIndex + 1 && payload.resetNext) || (i > stepIndex && payload.resetNexts)) {
            acc[ctx] = initContextFromOptionalSetters(steps[i]);
          } else {
            acc[ctx] = oldState.contexts[ctx];
          }
        } else {
          acc[ctx] = oldState.contexts[ctx];
        }
        return acc;
      }, {});

      /* the destinationContext is the one of
                the step that passed the done function
                thus the current one; but next is coming
            */
      const destinationContext = Object.keys(newContexts)[stepIndex];

      /* in case the step has a done function then FM.moveNext will first
               run the async request, once the resul is back it will
               be passed as a `result`
            
               so if this is the case it will be added to the destinationContext
               which here is the current step context
               (we did not move yet to the following one)
            */
      if (payload.result) {
        newContexts[destinationContext] = {
          ...newContexts[destinationContext],
          ...payload.result,
        };
      }

      /* time to move, unflagging the loading
               updating the stepIndex, and finally updating the context
               the will contain the retrieved data, which will persist
            */
      return {
        ...oldState,
        loading: false,
        stepIndex: nextIndex,
        contexts: newContexts,
        visitedSteps: visitedSteps.map((_, index) => (index <= nextIndex ? true : false)),
      };
    }

    /* the movePrev is a way simpler cause it does not manages the 
           done (or any inverse, which for the moment I'll not implement)
        */
    case 'movePrev': {
      const { firstActiveIndex, visitedSteps } = oldState;
      const prevIndex = payload && 'prev' in payload ? Math.max(payload.prev, firstActiveIndex) : skipInactive(-1);
      return {
        ...oldState,
        loading: false,
        stepIndex: prevIndex,
        visitedSteps: visitedSteps.map((_, index) => (index <= prevIndex ? true : false)),
      };
    }
    case 'skipStep': {
      if (payload.index < 1) return oldState;
      const { activeSteps } = oldState;
      const newActiveSteps = [...activeSteps];
      newActiveSteps[payload.index] = !payload.value;
      return {
        ...oldState,
        activeSteps: newActiveSteps,
        loading: false,
        lastActiveIndex: newActiveSteps.reduce((acc, stepActive, i) => (stepActive ? Math.max(acc, i) : acc), -1),
      };
    }
    case 'setActiveStep': {
      const { visitedSteps, stepsCount } = oldState;
      if (payload.index < 0 || payload.index >= stepsCount || visitedSteps[payload.index] !== true) return oldState;
      return {
        ...oldState,
        loading: false,
        stepIndex: payload.index,
        visitedSteps: visitedSteps.map((_, index) => (index <= payload.index ? true : false)),
      };
    }
    case 'forceError': {
      return {
        ...oldState,
        ErrorComponent: payload,
      };
    }
    default:
      return oldState;
  }
};

export default {
  func: reducer,
  init,
};
