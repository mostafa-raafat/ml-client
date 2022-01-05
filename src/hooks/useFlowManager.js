import { useContext } from 'react';
//
import { FlowManagerContext } from 'Contexts/FlowManagerContext';

// ----------------------------------------------------------------------

const useFlowManager = () => {
  const context = useContext(FlowManagerContext);

  if (!context) throw new Error('FlowManager context must be use inside FlowManagerProvider');

  return context;
};

export default useFlowManager;
