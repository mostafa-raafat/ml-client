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
import VerifyAccount from './steps/verify';
import useAuth from 'Hooks/useAuth';

const AddBalance = () => {
  const { mutate } = useCreateBalance();
  const { user } = useAuth();
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
            labels: ['Amount', 'Verify', 'Bank', 'Payment'],
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
            enabledNext: ({ amount: { value = '', currency } }) => parseInt(value) > 0 && currency,
            done: ({ manager: { skipStep } }) =>
              new Promise((resolve, reject) => {
                if (!user) {
                  skipStep(1, true);
                }
                resolve();
              }),
          },
          {
            component: VerifyAccount,
            stateContext: 'verify',
            setters: {
              variables: ['faceId', 'identityFront', 'identityBack'],
            },
            enabledNext: ({ verify: { faceId = '', identityFront = '', identityBack = '' } }) =>
              faceId && identityFront && identityBack,
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
