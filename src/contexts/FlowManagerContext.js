import { createContext, useReducer } from 'react';

const FlowManagerContext = createContext({});

const initialState = {
  activeStep: 0,
  steps: [],
};

const reducer = (oldState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'INIT_STEPS': {
      return { ...oldState, steps: payload.steps };
    }
    case 'ACTIVE_STEP': {
      const newSteps = oldState.steps.map((step, index) =>
        index > payload.activeStep ? { ...step, value: null } : step
      );
      return { ...oldState, activeStep: payload.activeStep, steps: newSteps };
    }
    case 'NEXT_STEP': {
      const newSteps = oldState.steps.map((step, index) =>
        index === oldState.activeStep
          ? {
              ...step,
              value: payload.value,
            }
          : step
      );
      return { ...oldState, activeStep: ++oldState.activeStep, steps: newSteps };
    }
    case 'BACK_STEP': {
      const newSteps = oldState.steps.map((step, index) =>
        index === oldState.activeStep
          ? {
              ...step,
              value: null,
            }
          : step
      );
      return { ...oldState, activeStep: --oldState.activeStep, steps: newSteps };
    }
    case 'RESET_STEPS': {
      const newSteps = oldState.steps.map((step) => ({
        ...step,
        value: null,
      }));
      return { ...oldState, activeStep: 0, steps: newSteps };
    }
    default:
      return oldState;
  }
};

const FlowManagerProvider = ({ children }) => {
  const [flowManagerState, flowManagerDispatch] = useReducer(reducer, initialState);

  return (
    <FlowManagerContext.Provider
      value={{
        flowManagerState,
        flowManagerDispatch,
      }}
    >
      {children}
    </FlowManagerContext.Provider>
  );
};

export { FlowManagerContext, FlowManagerProvider };
