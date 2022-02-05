import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
// cookies
import cookie from 'cookie';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Alert } from '@mui/material';
// layouts
import LogoOnlyLayout from 'Layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from 'Routes/paths';
// guards
import GuestGuard from 'Guards/GuestGuard';
// hooks
import useLocales from 'Hooks/useLocales';
// services
import useResendVerifyEmail from 'Services/mutations/useResendVerifyEmail';
// sections
import { VerifyCodeForm } from 'Sections/auth/verify-code';
// components
import Page from 'Components/Page';
import Iconify from 'Components/Iconify';
import LinkButton from 'Components/LinkButton';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

const VerifyCode = ({isAuthenticated}) => {
  const { query } = useRouter();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const { mutate, isLoading, isError, error } = useResendVerifyEmail();

  const resendVerifyEmail = () =>
    mutate(
      { token: query.token },
      {
        onSuccess: () => enqueueSnackbar('check your email!'),
      }
    );
  return (
    <GuestGuard isAuthenticated={isAuthenticated}>
      <Page title="Verify" sx={{ height: 1 }}>
        <RootStyle>
          <LogoOnlyLayout />

          <Container>
            <Box sx={{ maxWidth: 480, mx: 'auto' }}>
              <LinkButton
                size="small"
                href={PATH_AUTH.login}
                startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} width={20} height={20} />}
                sx={{ mb: 3 }}
              >
                Back
              </LinkButton>

              <Typography variant="h3" paragraph>
                Please check your email!
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                We have emailed a 6-digit confirmation code to acb@domain, please enter the code in below box to verify
                your email.
              </Typography>

              <Box sx={{ mt: 5, mb: 3 }}>
                {isError && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {translate(`errors:${error.code}`)}
                  </Alert>
                )}
                <VerifyCodeForm />
              </Box>

              <Typography variant="body2" align="center">
                Don’t have a code? &nbsp;
                <LoadingButton
                  variant="subtitle2"
                  underline="none"
                  loading={isLoading}
                  disabled={isLoading}
                  onClick={resendVerifyEmail}
                >
                  Resend code
                </LoadingButton>
              </Typography>
            </Box>
          </Container>
        </RootStyle>
      </Page>
    </GuestGuard>
  );
};

export default VerifyCode;

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
