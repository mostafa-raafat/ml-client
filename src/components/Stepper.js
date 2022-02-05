import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, StepConnector, StepLabel } from '@mui/material';
// components
import Iconify from './Iconify';

// ----------------------------------------------------------------------

export const StepConnectorStyle = styled(StepConnector)(({ theme }) => ({
  top: 10,
  left: 'calc(-50% + 20px)',
  right: 'calc(50% + 20px)',
  '& .MuiStepConnector-line': {
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
  '&.Mui-active, &.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

// ----------------------------------------------------------------------

export const StepLabelStyle = styled(StepLabel)(({ theme }) => ({
  '& .MuiStepLabel-label': {
    typography: theme.typography.subtitle2,
    color: theme.palette.text.disabled,
    marginTop: `${theme.spacing(1)} !important`,
  },
}));

// ----------------------------------------------------------------------

const StepIconStyle = styled(Box)(({ active, theme }) => ({
  zIndex: 9,
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: active ? theme.palette.primary.main : theme.palette.text.disabled,
}));

export function StepIcon({ active, completed, className }) {
  return (
    <StepIconStyle className={className} active={active}>
      {completed ? (
        <Iconify icon="eva:checkmark-fill" sx={{ zIndex: 1, width: 20, height: 20, color: 'primary.main' }} />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
          }}
        />
      )}
    </StepIconStyle>
  );
}
