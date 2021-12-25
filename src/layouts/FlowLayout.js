import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
// components
import Logo from 'Components/Logo';
import { Avatar, Container, Divider, Stack } from '@mui/material';
import { Box } from '@mui/system';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

// ----------------------------------------------------------------------

FlowLayout.propTypes = {
  children: PropTypes.node,
};

export default function FlowLayout({ children }) {
  return (
    <>
      <Box sx={{ position: 'absolute', height: '1px', top: '105px', backgroundColor: '#000', width: '100%' }} />
      <Container>
        <Box
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            display: 'flex',
            minHeight: '96px',
            py: '24px',
          }}
        >
          <Logo />
          <Avatar src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_5.jpg" alt="Rayan Moran" />
        </Box>
        <Stack alignItems="center">{children}</Stack>
      </Container>
    </>
  );
}
