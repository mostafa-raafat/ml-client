// next
import { useRouter } from 'next/router';
// @mui
import { Button, Stack, Typography, useTheme } from '@mui/material';
// hooks
import useFlowManager from 'Hooks/useFlowManager';
// contexts
import { FlowManagerActions } from 'Contexts/FlowManagerContext';
// services
import useCreateBalance from 'Services/mutations/useCreateBalance';
// routes
import { PATH_DASHBOARD } from 'Routes/paths';
// sections
import CurrencyAutoComplete from 'Sections/common/CurrencyAutoComplete';

export default function SelectCurrency() {
  const theme = useTheme();
  const {
    flowManagerState: { steps, active },
    flowManagerDispatch,
  } = useFlowManager();

  const { mutate } = useCreateBalance();
  const { push } = useRouter();

  const createBalance = ({ code }) =>
    mutate(
      {
        code,
      },
      {
        onSuccess() {
          push(PATH_DASHBOARD.root);
        },
      }
    );

  const currency = steps[active]?.value;

  return (
    <Stack
      spacing={3}
      width={400}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      display="flex"
      sx={{ py: 5 }}
    >
      <Typography variant="h3" component="div" sx={{ mb: 2 }}>
        Open a balance
      </Typography>
      <CurrencyAutoComplete
        width={400}
        currency={currency}
        onChange={(option) => {
          flowManagerDispatch({
            type: FlowManagerActions.STEP_VALUE,
            payload: {
              value: option,
            },
          });
        }}
      />
      <Typography
        variant="body1"
        component="div"
        color={theme.palette.text.secondary}
        sx={{ mb: 1, textAlign: 'left', width: '100%' }}
      >
        {currency
          ? `You'll be able to hold ${currency.code} to pay for future transfers.`
          : ' You can open balances in 50+ currencies.'}
      </Typography>
      <Button size="large" fullWidth variant="contained" disabled={!currency} onClick={() => createBalance(currency)}>
        Confirm
      </Button>
    </Stack>
  );
}
