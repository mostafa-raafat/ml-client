import PropTypes from 'prop-types';
import { Box, Stack } from '@mui/material';
// Hooks
import useFlowManager from 'Hooks/useFlowManager';

// ----------------------------------------------------------------------

FlowLayoutContent.propTypes = {
  children: PropTypes.node,
};

export default function FlowLayoutContent({ children }) {
  const {
    flowManagerState: { activeStep },
  } = useFlowManager();

  return (
    <Stack alignItems="center">
      <Box sx={{ p: 3, my: 3, minHeight: 120 }}>{children[activeStep]}</Box>
    </Stack>
  );
}
