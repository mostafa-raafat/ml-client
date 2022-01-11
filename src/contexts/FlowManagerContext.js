import { createContext, useReducer } from 'react';
import produce from 'immer';

const FlowManagerContext = createContext({});

// ----------------------------------------------------------------------

const FlowManagerActions = {
  INIT_STEPS: 'INIT_STEPS',
  STEP_VALUE: 'STEP_VALUE',
  ACTIVE_STEP: 'ACTIVE_STEP',
  NEXT_STEP: 'NEXT_STEP',
  BACK_STEP: 'BACK_STEP',
  RESET_STEPS: 'RESET_STEPS',
};

// ----------------------------------------------------------------------

const initialState = {
  active: 0,
  steps: [],
};

// ----------------------------------------------------------------------

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case FlowManagerActions.INIT_STEPS: {
      return produce(state, (draft) => {
        draft.steps = payload.steps;
      });
    }
    case FlowManagerActions.STEP_VALUE: {
      const { value } = payload;
      return produce(state, (draft) => {
        draft.steps[draft.active].value = value;
      });
    }
    case FlowManagerActions.ACTIVE_STEP: {
      const { active } = payload;
      return produce(state, (draft) => {
        draft.steps = draft.steps.map((step, index) => (index > active ? { ...step, value: null } : step));
        draft.active = active;
      });
    }
    case FlowManagerActions.NEXT_STEP: {
      return produce(state, (draft) => {
        draft.active = draft.active !== draft.steps.length - 1 ? draft.active + 1 : draft.active;
      });
    }
    case BACK_STEP: {
      return produce(state, (draft) => {
        draft.active = draft.active > 0 ? draft.active - 1 : draft.active;
      });
    }
    case FlowManagerActions.RESET_STEPS: {
      return produce(state, (draft) => {
        draft.steps = draft.steps.map((step) => ({
          ...step,
          value: null,
        }));
        draft.active = 0;
      });
    }
    default:
      return oldState;
  }
};

// ----------------------------------------------------------------------

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

export { FlowManagerContext, FlowManagerProvider, FlowManagerActions };
