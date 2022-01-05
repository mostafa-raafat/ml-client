import PropTypes from 'prop-types';
// @mui
import { Container, Divider } from '@mui/material';
// config
import { FLOW } from 'Config/index';
//
import FlowLayoutContent from './content';
import FlowLayoutHeader from './header';

// ----------------------------------------------------------------------

FlowLayout.propTypes = {
  children: PropTypes.node,
};

export default function FlowLayout({ children }) {
  return (
    <>
      <Container>
        <FlowLayoutHeader />
        <FlowLayoutContent>{children}</FlowLayoutContent>
      </Container>
      <Divider sx={{ position: 'absolute', top: FLOW.MAIN_HEADER, width: '100%' }} />
    </>
  );
}
