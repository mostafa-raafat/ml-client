import PropTypes from 'prop-types';
import { Box, Stack } from '@mui/material';
// hooks
import useFlowManager from 'Hooks/useFlowManager';

// ----------------------------------------------------------------------

FlowLayoutContent.propTypes = {
  children: PropTypes.node,
};

export default function FlowLayoutContent({ children }) {
  const {
    flowManagerState: { steps, active },
  } = useFlowManager();
  return (
    <Stack alignItems="center">
      <Box sx={{ p: 3, my: 3, minHeight: 120 }}>{steps.length > 1 ? children[active] : children}</Box>
    </Stack>
  );
}
