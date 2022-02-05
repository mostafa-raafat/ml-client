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
import Amount from './steps/amount';
import Confirm from './steps/confirm';

export default function ConvertBalance() {
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
    <FlowManager
      config={{
        wrapper: {
          component: FlowLayout,
          props: {
            labels: ['Amount', 'Confirm'],
          },
        },
        steps: [
          {
            component: Amount,
            stateContext: 'amount',
            setters: {
              variables: ['value', { toCurrency: { code: 'EGP', name: 'egyptian pound' } }],
            },
            enabledNext: ({ amount: { value = '', toCurrency = '' } }) => parseInt(value) > 0 && toCurrency,
          },
          {
            component: Confirm,
            enabledNext: true,
          },
        ],
        done: ({ selectCurrency: { value } }) => createBalance(value),
      }}
    />
  );
}
