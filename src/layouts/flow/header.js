import PropTypes from 'prop-types';
// nextjs
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/system';
import { Box, Step, Stepper, Avatar, Divider, IconButton, Stack } from '@mui/material';
// config
import { FLOW } from 'Config/index';
// components
import Logo from 'Components/Logo';
import Iconify from 'Components/Iconify';
import { StepIcon, StepConnectorStyle, StepLabelStyle } from 'Components/Stepper';

// ----------------------------------------------------------------------

const HeaderStyle = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'space-between',
  display: 'flex',
  height: FLOW.MAIN_HEADER,
  py: theme.spacing(3),
}));

// ----------------------------------------------------------------------

FlowLayoutHeader.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  visitedSteps: PropTypes.arrayOf(PropTypes.bool).isRequired,
  stepIndex: PropTypes.number.isRequired,
  setActiveStep: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------

export default function FlowLayoutHeader({ visitedSteps, stepIndex, labels, setActiveStep }) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <HeaderStyle>
      <Box sx={{ width: FLOW.LOGO_WIDTH, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
        <Logo />
      </Box>
      {visitedSteps.length > 1 && (
        <Stepper
          alternativeLabel
          activeStep={stepIndex}
          connector={<StepConnectorStyle />}
          sx={{
            flexGrow: '1',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: FLOW.STEPPER_WIDTH,
          }}
        >
          {visitedSteps.map((_, index) => (
            <Step
              key={labels[index]}
              onClick={() => setActiveStep(index)}
              sx={{ cursor: visitedSteps[index] && index < stepIndex ? 'pointer' : 'default' }}
            >
              <StepLabelStyle StepIconComponent={StepIcon}>{labels[index]}</StepLabelStyle>
            </Step>
          ))}
        </Stepper>
      )}
      <Stack
        direction="row"
        sx={{ width: FLOW.MENU_WIDTH, alignItems: 'center', justifyContent: 'center' }}
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <Avatar
          src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_5.jpg"
          alt="Rayan Moran"
          sx={{ width: theme.spacing(6), height: theme.spacing(6) }}
        />
        <IconButton
          size="large"
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={() => router.back()}
        >
          <Iconify icon="codicon:chrome-close" />
        </IconButton>
      </Stack>
    </HeaderStyle>
  );
}
