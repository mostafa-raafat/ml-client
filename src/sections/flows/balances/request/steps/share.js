// @mui
import { Button, Stack, Typography, useTheme, MenuItem } from '@mui/material';
import Iconify from 'Components/Iconify';
import InputDropdownIcon from 'Sections/common/InputDropdownIcon';

export default function Share() {
  const theme = useTheme();
  const dropdown = [
    {
      icon: 'bi:link-45deg',
      text: 'Copy my request link',
    },
    {
      icon: 'bx:bxl-whatsapp',
      text: 'Send with Whatsapp',
    },
    {
      icon: 'ic:outline-sms',
      text: 'Send with SMS',
    },
    {
      icon: 'feather:mail',
      text: 'Send with Email',
    },
  ];
  return (
    <Stack width={480} flexDirection="column" alignItems="center" justifyContent="center" display="flex">
      <Typography variant="h4" component="div" sx={{ mb: 4.5 }} textAlign="center">
        Your request is ready — how would you like to share it?
      </Typography>
      <InputDropdownIcon
        sx={{ width: 480, mb: 3, mt: 4.5 }}
        value="https://wise.com/pay#LQ4cLJteboubfBjHmL5upghxQ7c"
        label="Copy or share your request link"
        icon="bi:share"
        dropdown={dropdown}
      />

      <Typography variant="body" component="div" sx={{ mb: 6 }} color={theme.palette.grey[600]}>
        This link is valid until 13 February 2022. You can cancel this request from your account later.
      </Typography>
      <Button size="large" fullWidth variant="outlined" onClick={() => moveNext()}>
        Done
      </Button>
    </Stack>
  );
}
