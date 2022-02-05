// @mui
import { Box, Button, Card, Stack, Divider, CardHeader, Typography, CardContent } from '@mui/material';
import { AWS_PACKET_API } from 'Config/index';
// components
import InputWithIcon from 'Components/InputWithIcon';
import CurrencyAutoComplete from 'Sections/common/CurrencyAutoComplete';
import Iconify from 'Components/Iconify';

export default function Confirm({
  state: { value, setValue, currency, setCurrency },
  manager: { moveNext, moveBack },
}) {
  return (
    <Stack flexDirection="column" alignItems="center" justifyContent="center" display="flex">
      <Typography variant="h3" component="div" sx={{ mb: 5 }}>
        Does everything look right?
      </Typography>

      <Box sx={{ width: 480 }}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title="Conversion details"
            action={
              <Button size="small" startIcon={<Iconify icon={'eva:edit-fill'} />} onClick={() => moveBack()}>
                Edit
              </Button>
            }
          />

          <CardContent>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  You're converting
                </Typography>
                <Typography variant="subtitle2">100 EUR</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  To
                </Typography>
                <Typography variant="subtitle2">415.46 AED</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Fee
                </Typography>
                <Typography variant="subtitle2">0.92 EUR</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Rate
                </Typography>
                <Typography variant="subtitle2">4.19321</Typography>
              </Stack>
            </Stack>
            <Button sx={{ mt: 6 }} size="large" fullWidth variant="contained" onClick={() => moveNext()}>
              Convert
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
}
