// @mui
import { Button, Typography, TextField, Stack } from '@mui/material';
// components
import { varFade, MotionInView } from 'Components/animate';

// ----------------------------------------------------------------------

export default function FaqsForm() {
  return (
    <Stack spacing={3}>
      <MotionInView variants={varFade().inUp}>
        <Typography variant="h4">Haven't found the right help?</Typography>
      </MotionInView>

      <MotionInView variants={varFade().inUp}>
        <TextField fullWidth label="Name" />
      </MotionInView>

      <MotionInView variants={varFade().inUp}>
        <TextField fullWidth label="Email" />
      </MotionInView>

      <MotionInView variants={varFade().inUp}>
        <TextField fullWidth label="Subject" />
      </MotionInView>

      <MotionInView variants={varFade().inUp}>
        <TextField fullWidth label="Enter your message here." multiline rows={4} />
      </MotionInView>

      <MotionInView variants={varFade().inUp}>
        <Button size="large" variant="contained">
          Submit Now
        </Button>
      </MotionInView>
    </Stack>
  );
}
