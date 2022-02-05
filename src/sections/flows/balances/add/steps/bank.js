// @mui
import { Box, Button, Stack, Typography } from '@mui/material';
import { AWS_PACKET_API } from 'Config/index';
// components
import BankAutoComplete from 'Sections/common/BankAutoComplete';

export default function Bank({ state: { value, setValue }, manager: { moveNext } }) {
  return (
    <Stack flexDirection="column" alignItems="center" justifyContent="center" display="flex">
      <Typography variant="h3" component="div" sx={{ mb: 5 }}>
        Please choose your bank
      </Typography>

      <Box sx={{ width: 400 }}>
        <BankAutoComplete width={400} bank={value} onChange={(option) => setValue(option)} sx={{ mb: 5 }} />

        <Button size="large" fullWidth variant="contained" disabled={!value} onClick={() => moveNext()}>
          Continue
        </Button>
      </Box>
    </Stack>
  );
}
