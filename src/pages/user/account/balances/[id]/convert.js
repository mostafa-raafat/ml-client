// cookies
import cookie from 'cookie';
// layouts
import Layout from 'Layouts/index';
// guards
import AuthGuard from 'Guards/AuthGuard';
// hooks
import ConvertBalance from 'Sections/flows/balances/convert';
// components
import Page from 'Components/Page';

export default function Convert({ isAuthenticated }) {
  return (
    <AuthGuard isAuthenticated={isAuthenticated}>
      <Page title="Balance - Convert">
        <ConvertBalance />
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
