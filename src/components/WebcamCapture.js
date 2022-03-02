import React from 'react';
import PropTypes from 'prop-types';
import Webcam from 'react-webcam';
import { useTheme } from '@mui/system';
import { Box, Button } from '@mui/material';
// components
import Image from 'Components/Image';

// ----------------------------------------------------------------------

const WebcamCapture = ({ value = '', onCapture = () => {} }) => {
  const webcamRef = React.useRef(null);
  const theme = useTheme();
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  });

  return (
    <Box xs={{ my: 2 }}>
      <Box sx={{ height: 405 }}>
        {value === '' ? (
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={500}
            screenshotQuality={1}
          />
        ) : (
          <Image
            src={value}
            sx={{
              width: 500,
              height: 390,
              borderRadius: 1,
              border: `1px solid ${theme.palette.grey[500]}`,
            }}
          />
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 15, mb: 2 }}>
        <Button
          size="large"
          variant="contained"
          fullWidth
          disabled={!value}
          onClick={(e) => {
            e.preventDefault();
            onCapture('');
          }}
        >
          Retake Image
        </Button>
        <Button
          size="large"
          variant="contained"
          fullWidth
          disabled={value}
          onClick={(e) => {
            e.preventDefault();
            capture();
          }}
        >
          Capture
        </Button>
      </Box>
    </Box>
  );
};

WebcamCapture.propTypes = {
  value: PropTypes.string.isRequired,
  onCapture: PropTypes.func,
};

export default WebcamCapture;
