import { useState } from 'react';
// cookies
import cookie from 'cookie';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from 'Layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from 'Routes/paths';
// guards
import GuestGuard from 'Guards/GuestGuard';
// assets
import { SentIcon } from 'Assets/index';
// sections
import { ForgetPasswordForm } from 'Sections/auth/forget-password';
// components
import Page from 'Components/Page';
import LinkButton from 'Components/LinkButton';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

const ForgetPassword = ({ isAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <GuestGuard isAuthenticated={isAuthenticated}>
      <Page title="Forget Password" sx={{ height: 1 }}>
        <RootStyle>
          <LogoOnlyLayout />

          <Container>
            <Box sx={{ maxWidth: 480, mx: 'auto' }}>
              {!sent ? (
                <>
                  <Typography variant="h3" paragraph>
                    Forgot your password?
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                    Please enter the email address associated with your account and We will email you a link to reset
                    your password.
                  </Typography>

                  <ForgetPasswordForm onSent={() => setSent(true)} onGetEmail={(value) => setEmail(value)} />

                  <LinkButton fullWidth size="large" href={PATH_AUTH.login} sx={{ mt: 1 }}>
                    Back
                  </LinkButton>
                </>
              ) : (
                <Box sx={{ textAlign: 'center' }}>
                  <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

                  <Typography variant="h3" gutterBottom>
                    Request sent successfully
                  </Typography>
                  <Typography>
                    We have sent a confirmation email to &nbsp;
                    <strong>{email}</strong>
                    <br />
                    Please check your email.
                  </Typography>

                  <LinkButton size="large" variant="contained" href={PATH_AUTH.login} sx={{ mt: 5 }}>
                    Back
                  </LinkButton>
                </Box>
              )}
            </Box>
          </Container>
        </RootStyle>
      </Page>
    </GuestGuard>
  );
};

export default ForgetPassword;

export async function getServerSideProps({ req }) {
  const cookies = cookie.parse(req.headers.cookie ?? '');
  const access = cookies.access ?? false;
  if (access) {
    return {
      redirect: {
        permanent: false,
        destination: '/user/account',
      },
    };
  }
  return {
    props: {
      isAuthenticated: access ? true : false,
    },
  };
}
