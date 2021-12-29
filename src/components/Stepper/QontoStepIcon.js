import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
// components
import Iconify from 'Components/Iconify';

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
};

export default function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {active && <div className="QontoStepIcon-circle" />}
    </QontoStepIconRoot>
  );
}
