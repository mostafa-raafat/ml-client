import { useEffect } from 'react';
// hooks
import useFlowManager from 'Hooks/useFlowManager';
//
import steps from './steps';
import SelectCurrency from './steps/select-currency';
import Layout from 'Layouts/index';

export default function CreateBalance() {
  const { flowManagerDispatch } = useFlowManager();

  useEffect(() => {
    flowManagerDispatch({
      type: 'INIT_STEPS',
      payload: {
        steps,
      },
    });
  }, []);

  return (
    <Layout variant="flow">
      <SelectCurrency />
      <SelectCurrency />
      <SelectCurrency />
      <SelectCurrency />
    </Layout>
  );
}
