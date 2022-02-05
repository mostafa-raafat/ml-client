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
import Bank from './steps/bank';
import Payment from './steps/confirm';

const AddBalance = () => {
  const { mutate } = useCreateBalance();
  const {
    push,
    query: { code, amount },
  } = useRouter();

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
            labels: ['Amount', 'Bank', 'Payment'],
          },
        },
        steps: [
          {
            component: Amount,
            stateContext: 'amount',
            setters: {
              variables: ['value', { currency: { code } }],
            },
            props: { amount },
            enabledNext: ({ amount: { value = '', currency = '' } }) => parseInt(value) > 0 && currency,
          },
          {
            component: Bank,
            stateContext: 'bank',
            setters: {
              variables: [{ value: { id: '', code: '', name: '' } }],
            },
            enabledNext: ({ bank: { value } }) => value,
          },
          {
            component: Payment,
            stateContext: 'payment',
            enabledNext: () => true,
          },
        ],
        done: ({ selectCurrency: { value } }) => createBalance(value),
      }}
    />
  );
};

export default AddBalance;
