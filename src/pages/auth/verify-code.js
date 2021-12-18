// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from 'Layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from 'Routes/paths';
// components
import Page from 'Components/Page';
import Iconify from 'Components/Iconify';
import LinkButton from 'Components/LinkButton';
// sections
import { VerifyCodeForm } from 'Sections/auth/verify-code';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function VerifyCode() {
  return (
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
              <VerifyCodeForm />
            </Box>

            <Typography variant="body2" align="center">
              Don’t have a code? &nbsp;
              <LinkButton variant="subtitle2" underline="none" onClick={() => {}}>
                Resend code
              </LinkButton>
            </Typography>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
