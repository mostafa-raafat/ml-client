import { capitalCase } from 'change-case';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Tooltip, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from 'Routes/paths';
// hooks
import useAuth from 'Hooks/useAuth';
import useResponsive from 'Hooks/useResponsive';
// guards
import GuestGuard from 'Guards/GuestGuard';
// sections
import { LoginForm } from 'Sections/auth/login';
import AuthFirebaseSocials from 'Sections/auth/AuthFirebaseSocial';
// components
import Page from 'Components/Page';
import Logo from 'Components/Logo';
import Image from 'Components/Image';
import Link from 'Components/Link';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

const Login = () => {
  const { method } = useAuth();

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  return (
    <GuestGuard>
      <Page title="Login">
        <RootStyle>
          <HeaderStyle>
            <Logo />
            {smUp && (
              <Typography variant="body2" sx={{ mt: { md: -2 } }}>
                Don’t have an account?{' '}
                <Link variant="subtitle2" href={PATH_AUTH.register}>
                  Get started
                </Link>
              </Typography>
            )}
          </HeaderStyle>

          {mdUp && (
            <SectionStyle>
              <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                Hi, Welcome Back
              </Typography>
              <Image
                alt="login"
                src="https://minimal-assets-api.vercel.app/assets/illustrations/illustration_login.png"
              />
            </SectionStyle>
          )}

          <Container maxWidth="sm">
            <ContentStyle>
              <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    Sign in to Minimal
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
                </Box>

                <Tooltip title={capitalCase(method)} placement="right">
                  <>
                    <Image
                      disabledEffect
                      src={`https://minimal-assets-api.vercel.app/assets/icons/auth/ic_${method}.png`}
                      sx={{ width: 32, height: 32 }}
                    />
                  </>
                </Tooltip>
              </Stack>

              <AuthFirebaseSocials />

              <LoginForm />

              {!smUp && (
                <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                  Don’t have an account?{' '}
                  <Link variant="subtitle2" href={PATH_AUTH.register}>
                    Get started
                  </Link>
                </Typography>
              )}
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    </GuestGuard>
  );
};

export default Login;
