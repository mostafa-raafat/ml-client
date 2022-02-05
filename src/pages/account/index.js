// cookies
import cookie from 'cookie';
// @mui
import { Container, Typography } from '@mui/material';
// layouts
import Layout from 'Layouts/dashboard';
// hooks
import useSettings from 'Hooks/useSettings';
// components
import Page from 'Components/Page';
import AuthGuard from 'Guards/AuthGuard';

// ----------------------------------------------------------------------

export default function Account({ isAuthenticated }) {
  const { themeStretch } = useSettings();

  return (
    <AuthGuard isAuthenticated={isAuthenticated}>
      <Page title="Account">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Typography variant="h3" component="h1" paragraph>
            Account
          </Typography>
        </Container>
      </Page>
    </AuthGuard>
  );
}

// ----------------------------------------------------------------------

Account.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps({ req }) {
  const cookies = cookie.parse(req.headers.cookie ?? '');
  const access = cookies.access ?? false;
  if (!access) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login',
      },
    };
  }
  return {
    props: {
      isAuthenticated: access ? true : false,
    },
  };
}
