import { useEffect } from 'react';
// hooks
import useFlowManager from 'Hooks/useFlowManager';
// context
import { FlowManagerActions } from 'Contexts/FlowManagerContext';
// layouts
import Layout from 'Layouts/index';
//
import steps from './steps';
import SelectCurrency from './steps/select-currency';

export default function CreateBalance() {
  const { flowManagerDispatch } = useFlowManager();

  useEffect(() => {
    flowManagerDispatch({
      type: FlowManagerActions.INIT_STEPS,
      payload: {
        steps,
      },
    });
  }, []);

  return (
    <Layout variant="flow">
      <SelectCurrency />
    </Layout>
  );
}
