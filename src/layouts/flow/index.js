import PropTypes from 'prop-types';

import { Container } from '@mui/material';
//
import FlowLayoutContent from './content';
import FlowLayoutHeader from './header';

// ----------------------------------------------------------------------

FlowLayout.propTypes = {
  children: PropTypes.node,
};

export default function FlowLayout({ children }) {
  return (
    <Container>
      <FlowLayoutHeader />
      <FlowLayoutContent>{children}</FlowLayoutContent>
    </Container>
  );
}
