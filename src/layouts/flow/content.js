import PropTypes from 'prop-types';
import { Box, Stack } from '@mui/material';
import { FLOW } from 'Config/index';

// ----------------------------------------------------------------------

FlowLayoutContent.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

export default function FlowLayoutContent({ children }) {
  return (
    <Stack alignItems="center" height={`calc(100% - ${FLOW.MAIN_HEADER}px)`}>
      <Box sx={{ p: 3, my: 3, minHeight: 120 }}>{children}</Box>
    </Stack>
  );
}
