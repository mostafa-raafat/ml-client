import { useState, useEffect, useCallback } from 'react';
// @mui
import { Button, Stack, Typography, useTheme } from '@mui/material';
// sections
import CurrencyAutoComplete from 'Sections/common/CurrencyAutoComplete';
import useFlowManager from 'Hooks/useFlowManager';

const initCurrency = { label: '', code: '', phone: '' };

export default function SelectCurrency() {
  const theme = useTheme();
  const {
    flowManagerState: { activeStep, steps },
    flowManagerDispatch,
  } = useFlowManager();

  const [currency, setCurrency] = useState(initCurrency);

  const onSelectCurrency = useCallback(
    (option) => {
      setCurrency({ ...option });
    },
    [activeStep]
  );

  useEffect(() => {
    setCurrency(steps[activeStep]?.value ?? initCurrency);
  }, [activeStep]);

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
      <CurrencyAutoComplete width={400} currency={currency} onChange={onSelectCurrency} />
      <Typography
        variant="body1"
        component="div"
        color={theme.palette.text.secondary}
        sx={{ mb: 1, textAlign: 'left', width: '100%' }}
      >
        {currency.label
          ? `You'll be able to hold ${currency.code} to pay for future transfers.`
          : ' You can open balances in 50+ currencies.'}
      </Typography>
      <Button
        size="large"
        fullWidth
        variant="contained"
        onClick={() => {
          flowManagerDispatch({
            type: 'NEXT_STEP',
            payload: {
              value: currency,
            },
          });
          setCurrency(initCurrency);
        }}
      >
        Confirm
      </Button>
    </Stack>
  );
}
