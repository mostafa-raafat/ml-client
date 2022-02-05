// cookies
import cookie from 'cookie';
// layouts
import Layout from 'Layouts/index';
// guards
import AuthGuard from 'Guards/AuthGuard';
// hooks
import RequestBalance from 'Sections/flows/balances/request';
// components
import Page from 'Components/Page';

export default function Request({ isAuthenticated }) {
  return (
    <AuthGuard isAuthenticated={isAuthenticated}>
      <Page title="Balances - Request">
        <RequestBalance />
      </Page>
    </AuthGuard>
  );
}

// ----------------------------------------------------------------------

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
