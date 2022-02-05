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

const RequestBalance = () => {
  const { mutate } = useCreateBalance();
  const router = useRouter();

  const createBalance = async ({ code }) =>
    mutate(
      { code },
      {
        onSuccess: (data) => router.push(PATH_DASHBOARD.user.balances),
      }
    );

  return (
    <FlowManager
      config={{
        wrapper: {
          component: FlowLayout,
          props: {
            labels: ['Amount'],
          },
        },
        steps: [
          {
            component: Amount,
            stateContext: 'amount',
            setters: {
              variables: ['value', 'note'],
            },
            enabledNext: ({ amount: { value = '' } }) => value,
          },
        ],
        done: ({ amount: { value } }) => createBalance(value),
      }}
    />
  );
};

export default RequestBalance;
