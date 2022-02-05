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
import Share from './steps/share';

const RequestBalance = () => {
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
            labels: ['Amount', 'Share'],
          },
        },
        steps: [
          {
            component: Amount,
            stateContext: 'amount',
            setters: {
              variables: ['value', 'note'],
            },
            enabledNext: ({ amount: { value = '' } }) => parseInt(value) > 0,
          },
          {
            component: Share,
            stateContext: 'share',
            setters: {
              variables: ['value'],
            },
            enabledNext: ({ share: { value = '' } }) => value,
          },
        ],
        done: ({ selectCurrency: { value } }) => createBalance(value),
      }}
    />
  );
};

export default RequestBalance;
