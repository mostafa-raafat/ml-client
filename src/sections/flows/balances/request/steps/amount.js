// @mui
import { Button, Stack, TextField, Typography } from '@mui/material';
import { AWS_PACKET_API } from 'Config/index';
// components
import InputWithIcon from 'Components/InputWithIcon';

export default function Amount({ state: { value, setValue, note, setNote }, manager: { moveNext } }) {
  const disable = !(parseInt(value) > 0);
  return (
    <Stack width={480} flexDirection="column" alignItems="center" justifyContent="center" display="flex">
      <Typography variant="h3" component="div" sx={{ mb: 5 }}>
        Fill out your request
      </Typography>

      <InputWithIcon
        input={{ label: 'Request', placeholder: '0', value, setValue, width: 480 }}
        icon={{ src: `${AWS_PACKET_API}/currencies/egp.png`, alt: 'egypt-flag', text: 'EGP' }}
        info="You have 16,551.79 EUR available in your balance"
        sx={{ mb: 3 }}
      />

      <TextField
        value={note}
        onChange={(e) => setNote(e.target.value)}
        label="Add a note (optional)"
        fullWidth
        multiline
        rows={6}
        sx={{ mb: 3 }}
      />
      <Button size="large" fullWidth variant="contained" disabled={disable} onClick={() => moveNext()}>
        Confirm
      </Button>
    </Stack>
  );
}
