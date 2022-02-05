// @mui
import { Button, Stack, Typography, useTheme } from '@mui/material';
// sections
import CurrencyAutoComplete from 'Sections/common/CurrencyAutoComplete';

export default function SelectCurrency({ state: { value, setValue }, manager: { moveNext } }) {
  const theme = useTheme();
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
      <CurrencyAutoComplete width={400} currency={value} onChange={(option) => setValue(option)} />
      <Typography
        variant="body1"
        component="div"
        color="text.secondary"
        sx={{ mb: 1, textAlign: 'left', width: '100%' }}
      >
        {value
          ? `You'll be able to hold ${value.code} to pay for future transfers.`
          : ' You can open balances in 50+ currencies.'}
      </Typography>
      <Button size="large" fullWidth variant="contained" disabled={!value} onClick={() => moveNext()}>
        Confirm
      </Button>
    </Stack>
  );
}
