// @mui
import { Box, Button, Stack, Typography } from '@mui/material';
import { AWS_PACKET_API } from 'Config/index';
// components
import InputWithIcon from 'Components/InputWithIcon';
import CurrencyAutoComplete from 'Sections/common/CurrencyAutoComplete';

export default function Amount({
  state: { value, setValue, currency, setCurrency },
  manager: { moveNext },
  props: { amount = 0 },
}) {
  const disable = !(parseInt(value) > 0);
  return (
    <Stack flexDirection="column" alignItems="center" justifyContent="center" display="flex">
      <Typography variant="h3" component="div" sx={{ mb: 5 }}>
        How much do you want to add?
      </Typography>

      <Box sx={{ width: 400 }}>
        <InputWithIcon
          input={{ label: 'Add', placeholder: '0', value, setValue, width: 400 }}
          icon={{ src: `${AWS_PACKET_API}/currencies/egp.png`, alt: 'egypt-flag', text: 'EGP' }}
          info={`You have ${amount} EUR available in your balance`}
          sx={{ mb: 5 }}
        />

        <CurrencyAutoComplete
          width={400}
          currency={currency}
          onChange={(option) => setCurrency(option)}
          label="Paying with"
          sx={{ mb: 5 }}
        />

        <Button size="large" fullWidth variant="contained" disabled={disable} onClick={() => moveNext()}>
          Continue
        </Button>
      </Box>
    </Stack>
  );
}
