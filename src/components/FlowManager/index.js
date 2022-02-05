import React, { useReducer } from 'react';
import reducer from './reducer';

const isFunction = (what) => typeof what === 'function';
const getSetterName = (s) => `set${s[0].toUpperCase()}${s.slice(1)}`;
const isStateBasedProp = (name) => {
  const split = name.match(/^fromState_(.*)$/);
  return split && split[1];
};

// eslint-disable-next-line complexity
const FlowManager = ({ config }) => {
  const {
    steps,
    wrapper: { component: Wrapper, props: WrapperProps = {}, setters: WrapperSetters = {} } = {},
    done = (o) => Promise.resolve(o),
    // ErrorComponent,
    ExitComponent = null,
    LoadingComponent = null,
  } = config;
  let { ErrorComponent } = config;
  let finalComponentProps = null;
  let finalWrapperProps = null;

  const [state, dispatch] = useReducer(reducer.func, reducer.init(config));

  const {
    stepIndex,
    firstActiveIndex,
    lastActiveIndex,
    stepsCount,
    activeSteps,
    empty,
    loading,
    changed,
    visitedSteps,
  } = state;
  if ('ErrorComponent' in state) {
    ErrorComponent = state.ErrorComponent;
  }

  const currentStep = steps[stepIndex];

  // process the current step config passed from the config
  //
  const {
    stateContext = null,
    setters: ComponentSetters = {},
    props: ComponentProps = {},
    canFinish = () => false,
    nextStepIs,
    prevStepIs,
    done: doneStep,
    resetNext = false,
    resetNexts = false,
  } = currentStep;

  // might change cause of EndComponent
  let { component: Component } = currentStep;

  const isLastStep = lastActiveIndex === stepIndex;
  const isFirstStep = stepIndex === firstActiveIndex;

  const defaultEnablers = {
    enabledPrev: true,
    enabledNext: false,
  };
  const enablers = Object.keys(defaultEnablers).reduce((acc, enabler) => {
    if (empty || ErrorComponent || loading) return false;
    if (enabler in currentStep) {
      acc[enabler] = isFunction(currentStep[enabler]) ? currentStep[enabler](state.contexts) : currentStep[enabler];
    } else {
      acc[enabler] = defaultEnablers[enabler];
    }
    return acc;
  }, {});

  const addComponentStateEntry = ({ context, name, value }) => {
    dispatch({
      type: 'addComponentStateEntry',
      payload: {
        context,
        name,
        value,
      },
    });
  };

  const getMappedSetters = (setters, context) =>
    Object.keys(setters).reduce((acc, actionName) => {
      if (actionName === 'variables') {
        return {
          ...acc,
          ...setters[actionName].reduce((iacc, name) => {
            // here could be a simple string
            if (typeof name === 'string') {
              return {
                ...iacc,
                [getSetterName(name)]: (value) =>
                  addComponentStateEntry({
                    context,
                    name,
                    value,
                  }),
              };
              // or an object {key1: initVal, key2: initVal2} thus we need to use the key as name
            }
            return {
              ...iacc,
              ...Object.keys(name).reduce(
                (iiacc, n) => ({
                  ...iiacc,
                  [getSetterName(n)]: (value) =>
                    addComponentStateEntry({
                      context,
                      name: n,
                      value,
                    }),
                }),
                {}
              ),
            };
          }, {}),
        };
      }
      acc[actionName] = (value) =>
        dispatch({
          type: 'addComponentStateEntry',
          payload: {
            context,
            name: setters[actionName],
            value,
          },
        });
      return acc;
    }, {});

  const mappedComponentSetters = getMappedSetters(ComponentSetters, stateContext);

  const mappedWrapperSetters = getMappedSetters(WrapperSetters, 'wrapper');

  const managerActions = {
    moveNext: () => {
      // stop if disabled
      // this is covered any somehow coverall cant get there
      /* istanbul ignore next */
      if (!enablers.enabledNext) return;
      const action = { type: 'moveNext' };

      /**
       * check if done is provided for this step
       */
      const finishStep = (dispatchingFun) => {
        if (doneStep) {
          doneStep(finalComponentProps)
            .then(dispatchingFun)
            .catch((ec) =>
              dispatch({
                type: 'forceError',
                payload: ec,
              })
            );
        } else {
          dispatchingFun();
        }
      };

      // maybe
      const mayfinish = canFinish(finalComponentProps);
      if (mayfinish || isLastStep) {
        dispatch({ type: 'loading' });
        done(finalWrapperProps.contexts)
          .then(() => {
            finishStep(() =>
              dispatch(
                ExitComponent
                  ? /*
                     * in case the ExitComponent is provided
                     * the trigger the close, so the exitComponent gets rendered
                     */
                    { type: 'close' }
                  : /* otherwise the state will reset, start over */
                    {
                      type: 'reset',
                      payload: config,
                    }
              )
            );
          })
          .catch((ec) =>
            dispatch({
              type: 'forceError',
              payload: ec,
            })
          );
        return;
      }

      if (nextStepIs && typeof nextStepIs === 'function') {
        action.payload = {
          next: nextStepIs(finalComponentProps),
        };
      }
      dispatch({ type: 'loading' });
      finishStep((previousStepDoneResponse) =>
        dispatch({
          ...action,
          payload: {
            ...action.payload,
            result: previousStepDoneResponse,
            resetNext,
            resetNexts,
          },
        })
      );
    },
    movePrev: () => {
      // stop if on step 0 or disabled
      // this is covered any somehow coverall cant get there
      /* istanbul ignore next */
      if (isFirstStep || !enablers.enabledPrev) return;

      const action = { type: 'movePrev' };
      if (prevStepIs && typeof prevStepIs === 'function') {
        action.payload = {
          prev: prevStepIs(finalComponentProps),
        };
      }
      dispatch(action);
    },
    skipStep: (index, value) => {
      dispatch({
        type: 'skipStep',
        payload: {
          index,
          value,
        },
      });
    },
    setActiveStep: (index, value) => {
      dispatch({
        type: 'setActiveStep',
        payload: {
          index,
          value,
        },
      });
    },
    reset: () =>
      setTimeout(
        () =>
          dispatch({
            type: 'reset',
            payload: config,
          }),
        100
      ),
    nop: () =>
      dispatch({
        type: 'nop',
      }),
  };

  const managerProps = {
    manager: {
      ...managerActions,
      ...enablers,
      stepsCount,
      firstActiveIndex,
      lastActiveIndex,
      isFirstStep,
      isLastStep,
      currentStep,
      activeSteps,
      visitedSteps,
      stepIndex,
      loading,
      changed,
    },
  };

  // used by stateBasedProps
  const unfinishedComponentProps = {
    contexts: {
      ...state.contexts,
    },
    state: {
      ...state.contexts[stateContext],
      ...mappedComponentSetters,
    },
    ...managerProps,
  };

  // add component props
  finalComponentProps = {
    ...unfinishedComponentProps,
    props: Object.keys(ComponentProps).reduce((acc, cProp) => {
      const stateBased = isStateBasedProp(cProp);
      if (stateBased && isFunction(ComponentProps[cProp])) {
        acc[stateBased] = ComponentProps[cProp](unfinishedComponentProps);
      } else {
        acc[cProp] = ComponentProps[cProp];
      }
      return acc;
    }, {}),
  };

  finalWrapperProps = {
    contexts: {
      ...state.contexts,
    },
    state: {
      ...mappedWrapperSetters,
      ...state.contexts.wrapper,
    },
    ...managerProps,
  };

  if (Wrapper) {
    finalWrapperProps.props = Object.keys(WrapperProps).reduce((acc, wProp) => {
      const stateBased = isStateBasedProp(wProp);
      if (stateBased && isFunction(WrapperProps[wProp])) {
        acc[stateBased] = WrapperProps[wProp](finalWrapperProps);
      } else {
        acc[wProp] = WrapperProps[wProp];
      }
      return acc;
    }, {});
  }

  if (loading && LoadingComponent) {
    Component = LoadingComponent;

    // exit case
  } else if (empty && ExitComponent) {
    Component = ExitComponent;
    // but get rid of the step state
    finalComponentProps.manager.isEndStep = true;
    finalWrapperProps.manager.isEndStep = true;
    delete finalComponentProps.state;
  }
  // this can be ignored cause is the case without wrapper
  /* istanbul ignore next */
  return Wrapper ? (
    <Wrapper {...finalWrapperProps}>
      {ErrorComponent && <ErrorComponent />}
      <Component {...finalComponentProps} />
    </Wrapper>
  ) : (
    <div>
      {ErrorComponent && <ErrorComponent />}
      <Component {...finalComponentProps} />
    </div>
  );
};
export default FlowManager;
