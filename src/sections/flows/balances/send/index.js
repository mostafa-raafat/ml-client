// next
import { useRouter } from 'next/router';
// services
import useCreateBalance from 'Services/mutations/useCreateBalance';
// routes
import { PATH_DASHBOARD } from 'Routes/paths';
// layouts
import FlowLayout from 'Layouts/flow';
// components
import FlowManager from 'Components/FlowManager';
//
import SelectCurrency from './steps/selectCurrency';

const CreateBalance = () => {
  const { mutate } = useCreateBalance();
  const { push } = useRouter();

  const createBalance = async ({ code }) =>
    mutate(
      { code },
      {
        onSuccess: () => push(PATH_DASHBOARD.root),
      }
    );

  return (
    <div>
      <FlowManager
        config={{
          wrapper: {
            component: FlowLayout,
            props: {
              fromState_label: ({
                manager: {
                  currentStep: { stateContext },
                },
              }) => stateContext,
            },
          },
          steps: [
            {
              component: SelectCurrency,
              stateContext: 'selectCurrency',
              setters: {
                variables: ['value'],
              },
              enabledNext: ({ selectCurrency: { value = '' } }) => value,
            },
          ],
          done: ({ selectCurrency: { value } }) => createBalance(value),
        }}
      />
    </div>
  );
};

export default CreateBalance;
