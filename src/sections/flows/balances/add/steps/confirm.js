// @mui
import { Box, Button, Card, Stack, CardHeader, Typography, CardContent } from '@mui/material';
// components
import { useTheme } from '@mui/system';

export default function Confirm({ manager: { moveNext, moveBack } }) {
  const theme = useTheme();
  return (
    <Stack flexDirection="column" alignItems="baseline" display="flex" sx={{ width: 550 }}>
      <Typography variant="h4" component="div" color="primary.main" sx={{ mb: 2 }}>
        Next, send us the money using your bank
      </Typography>
      <Typography variant="body1" color="text.secondary" component="div" sx={{ mb: 5 }} textAlign="center">
        You'll need to do this next bit manually. Use the bank details below to make a payment to Wise from your bank
        account.
      </Typography>

      <Card sx={{ mb: 3, width: '100%' }}>
        <CardHeader
          title={
            <Typography
              variant="body1"
              color="primary.main"
              fontWeight={600}
              sx={{ borderBottom: `1px solid ${theme.palette.grey[500_32]}`, pb: 3 }}
            >
              Our bank details for payments in EUR
            </Typography>
          }
        />

        <CardContent>
          <Stack spacing={3}>
            <Stack direction="row">
              <Box flex="1">
                <Typography variant="body2" color="text.secondary">
                  Payee name
                </Typography>
                <Typography variant="body1" color="primary.main">
                  MoneyFly Egypt
                </Typography>
              </Box>
              <Box flex="1">
                <Typography variant="body2" color="text.secondary">
                  Use this reference
                </Typography>
                <Typography variant="body1" color="primary.main">
                  P23159796
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row">
              <Box flex="1">
                <Typography variant="body2" color="text.secondary">
                  Amount to send
                </Typography>
                <Typography variant="body1" color="primary.main">
                  10 EUR
                </Typography>
              </Box>
              <Box flex="1">
                <Typography variant="body2" color="text.secondary">
                  IBAN
                </Typography>
                <Typography variant="body1" color="primary.main">
                  BE79 9670 4078 5533
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row">
              <Box flex="1">
                <Typography variant="body2" color="text.secondary">
                  Bank code (BIC/SWIFT)
                </Typography>
                <Typography variant="body1" color="primary.main">
                  TRWIBEB1XXX
                </Typography>
              </Box>
              <Box flex="1">
                <Typography variant="body2" color="text.secondary">
                  Our bank address
                </Typography>
                <Typography variant="body1" color="primary.main">
                  MoneyFly Egypt SA Avenue Louise 54 Room s52 1050 Brussels Belgium
                </Typography>
              </Box>
            </Stack>
            <Stack direction="column" sx={{ pt: 2 }} spacing={1}>
              <Typography variant="body1" color="text.secondary">
                MoneyFly never takes money automatically from your account.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                You can use your bank's online banking or mobile app to make vour bank transter to MoneyFly.
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
