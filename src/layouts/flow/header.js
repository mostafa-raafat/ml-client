// nextjs
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/system';
import {
  Box,
  Step,
  Stepper as MuiStepper,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
  Avatar,
  Divider,
  IconButton,
  Stack,
} from '@mui/material';
// hooks
import useFlowManager from 'Hooks/useFlowManager';
// routes
import { PATH_DASHBOARD } from 'Routes/paths';
// config
import { FLOW } from 'Config/index';
// components
import Logo from 'Components/Logo';
import Iconify from 'Components/Iconify';
import QontoStepIcon from 'Components/stepper/QontoStepIcon';

// ----------------------------------------------------------------------

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: '-50%',
    right: '50%',
    marginTop: 0,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderRadius: 1,
    borderTopWidth: 3,
    borderColor: theme.palette.divider,
  },
}));

const StepLabelStyle = styled(StepLabel)(({ theme }) => ({
  '& span span': {
    marginTop: `${theme.spacing(1)} !important`,
  },
}));

const HeaderStyle = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'space-between',
  display: 'flex',
  height: FLOW.MAIN_HEADER,
  py: theme.spacing(3),
}));

// ----------------------------------------------------------------------

export default function FlowLayoutHeader() {
  const {
    flowManagerState: { steps, activeStep },
    flowManagerDispatch,
  } = useFlowManager();

  const router = useRouter();
  const theme = useTheme();

  const goBack = () => router.push(PATH_DASHBOARD.root);

  return (
    <HeaderStyle>
      <Box sx={{ width: FLOW.LOGO_WIDTH, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
        <Logo />
      </Box>
      {steps.length > 1 && (
        <MuiStepper
          alternativeLabel
          activeStep={activeStep}
          connector={<QontoConnector />}
          sx={{
            flexGrow: '1',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: FLOW.STEPPER_WIDTH,
            px: theme.spacing(3),
          }}
        >
          {steps.map(({ label }, index) => (
            <Step key={label}>
              <StepLabelStyle
                StepIconComponent={QontoStepIcon}
                onClick={() =>
                  index < activeStep &&
                  flowManagerDispatch({
                    type: 'ACTIVE_STEP',
                    payload: {
                      activeStep: index,
                    },
                  })
                }
                sx={{ cursor: index < activeStep ? 'pointer' : 'default' }}
              >
                {label}
              </StepLabelStyle>
            </Step>
          ))}
        </MuiStepper>
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
        <IconButton size="large" color="primary" aria-label="upload picture" component="span" onClick={goBack}>
          <Iconify icon="codicon:chrome-close" />
        </IconButton>
      </Stack>
    </HeaderStyle>
  );
}