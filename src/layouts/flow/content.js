import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Box, Stack } from '@mui/material';
// context
import { FlowManagerContext } from 'Contexts/FlowManagerContext';

// ----------------------------------------------------------------------

FlowLayoutContent.propTypes = {
  children: PropTypes.node,
};

export default function FlowLayoutContent({ children }) {
  const {
    flowManagerState: { activeStep },
  } = useContext(FlowManagerContext);

  return (
    <Stack alignItems="center">
      <Box sx={{ p: 3, my: 3, minHeight: 120 }}>{children[activeStep]}</Box>
    </Stack>
  );
}
