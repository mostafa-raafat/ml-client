import PropTypes from 'prop-types';
import { cloneElement, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Step, Stepper as MuiStepper, StepLabel, StepConnector, stepConnectorClasses } from '@mui/material';

// ----------------------------------------------------------------------

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
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

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  height: 22,
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.disabled,
  ...(ownerState.active && {
    color: theme.palette.success.main,
  }),
  '& .QontoStepIcon-circle': {
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

export function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {active && <div className="QontoStepIcon-circle" />}
    </QontoStepIconRoot>
  );
}

// ----------------------------------------------------------------------

Stepper.propTypes = {
  children: PropTypes.node,
};

export default function Stepper({ children = [] }) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <MuiStepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
        {children.map(({ props: { label } }, index) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={QontoStepIcon}
              onClick={() => index < activeStep && setActiveStep(index)}
              sx={{ cursor: index < activeStep ? 'pointer' : 'default' }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </MuiStepper>

      <Box sx={{ p: 3, my: 3, minHeight: 120 }}>
        {cloneElement(children[activeStep], {
          handleReset,
          handleNext,
          handleBack,
          activeStep,
          setActiveStep,
          stepsCount: children.length,
        })}
      </Box>
    </>
  );
}
