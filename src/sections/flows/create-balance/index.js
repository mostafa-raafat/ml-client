import { useEffect } from 'react';
// hooks
import useFlowManager from 'Hooks/useFlowManager';
//
import steps from './steps';
import SelectCurrency from './steps/select-currency';
import FlowLayout from 'Layouts/flow';

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
    <FlowLayout>
      <SelectCurrency />
      <SelectCurrency />
      <SelectCurrency />
      <SelectCurrency />
    </FlowLayout>
  );
}
