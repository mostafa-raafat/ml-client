// cookies
import cookie from 'cookie';
// guards
import AuthGuard from 'Guards/AuthGuard';
// hooks
import AddBalance from 'Sections/flows/balances/add';
// components
import Page from 'Components/Page';

export default function Request({ isAuthenticated }) {
  return (
    <AuthGuard isAuthenticated={isAuthenticated}>
      <Page title="Balances - Add">
        <AddBalance />
      </Page>
    </AuthGuard>
  );
}

// ----------------------------------------------------------------------

export async function getServerSideProps({ req }) {
  const cookies = cookie.parse(req.headers.cookie ?? '');
  const access = cookies.access ?? false;
  console.log('access', access);
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
