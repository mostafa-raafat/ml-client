// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from 'Layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from 'Routes/paths';
// sections
import { ResetPasswordForm } from 'Sections/auth/reset-password';
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

const ResetPassword = () => {
  return (
    <Page title="Reset Password" sx={{ height: 1 }}>
      <RootStyle>
        <LogoOnlyLayout />

        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            <Typography variant="h3" paragraph>
              Reset Password
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Please choose new password.</Typography>

            <ResetPasswordForm />

            <LinkButton fullWidth size="large" href={PATH_AUTH.login} sx={{ mt: 1 }}>
              Back
            </LinkButton>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
};

export default ResetPassword;
