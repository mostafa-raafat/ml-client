// @mui
import { Button, Typography, TextField, Stack } from '@mui/material';
// components
import { varFade, MotionViewport } from 'Components/animate';

// ----------------------------------------------------------------------

export default function FaqsForm() {
  return (
    <Stack spacing={3}>
      <MotionViewport variants={varFade().inUp}>
        <Typography variant="h4">Haven't found the right help?</Typography>
      </MotionViewport>

      <MotionViewport variants={varFade().inUp}>
        <TextField fullWidth label="Name" />
      </MotionViewport>

      <MotionViewport variants={varFade().inUp}>
        <TextField fullWidth label="Email" />
      </MotionViewport>

      <MotionViewport variants={varFade().inUp}>
        <TextField fullWidth label="Subject" />
      </MotionViewport>

      <MotionViewport variants={varFade().inUp}>
        <TextField fullWidth label="Enter your message here." multiline rows={4} />
      </MotionViewport>

      <MotionViewport variants={varFade().inUp}>
        <Button size="large" variant="contained">
          Submit Now
        </Button>
      </MotionViewport>
    </Stack>
  );
}
