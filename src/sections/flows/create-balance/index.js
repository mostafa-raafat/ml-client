import { useContext, useEffect } from 'react';
// context
import { FlowManagerContext } from 'Contexts/FlowManagerContext';
//
import steps from './steps';
import SelectCurrency from './steps/select-currency';
import FlowLayout from 'Layouts/flow';

export default function CreateBalance() {
  const { flowManagerDispatch } = useContext(FlowManagerContext);

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
