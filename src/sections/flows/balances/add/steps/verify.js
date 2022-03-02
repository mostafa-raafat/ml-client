import { useState } from 'react';
// @mui
import { Box, Button, Stack, Typography } from '@mui/material';
// components
import WebcamCapture from 'Components/WebcamCapture';

export default function VerifyAccount({
  state: { faceId, setFaceId, identityFront, setIdentityFront, identityBack, setIdentityBack },
  manager: { moveNext },
}) {
  const [step, setStep] = useState(0);
  const FaceIdComponent = (
    <Box>
      <Typography variant="h3" component="div" sx={{ mb: 5 }}>
        FaceIdComponent
      </Typography>

      <Box sx={{ width: 500 }}>
        <WebcamCapture onCapture={(image) => setFaceId(image)} value={faceId} />
        <Button size="large" fullWidth variant="contained" disabled={!faceId} onClick={() => setStep(1)}>
          Next
        </Button>
      </Box>
    </Box>
  );
  const IdentityFrontComponent = (
    <Box>
      <Typography variant="h3" component="div" sx={{ mb: 5 }}>
        IdentityFrontComponent
      </Typography>

      <Box sx={{ width: 500 }}>
        <WebcamCapture onCapture={(image) => setIdentityFront(image)} value={identityFront} />
        <Button size="large" fullWidth variant="contained" disabled={!identityFront} onClick={() => setStep(2)}>
          Next
        </Button>
      </Box>
    </Box>
  );
  const IdentityBackComponent = (
    <Box>
      <Typography variant="h3" component="div" sx={{ mb: 5 }}>
        IdentityBackComponent
      </Typography>

      <Box sx={{ width: 500 }}>
        <WebcamCapture onCapture={(image) => setIdentityBack(image)} value={identityBack} />
        <Button
          size="large"
          fullWidth
          variant="contained"
          disabled={!faceId || !identityFront || !identityBack}
          onClick={() => moveNext()}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
  const render = () => {
    switch (step) {
      case 0:
        return FaceIdComponent;
      case 1:
        return IdentityFrontComponent;
      case 2:
        return IdentityBackComponent;
    }
  };
  return (
    <Stack flexDirection="column" alignItems="center" justifyContent="center" display="flex">
      {render()}
    </Stack>
  );
}
