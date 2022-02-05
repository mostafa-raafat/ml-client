// cookies
import cookie from 'cookie';
// guards
import AuthGuard from 'Guards/AuthGuard';
// sections
import CreateBalance from 'Sections/flows/balances/create';
// components
import Page from 'Components/Page';

export default function Balances({ isAuthenticated }) {
  return (
    <AuthGuard isAuthenticated={isAuthenticated}>
      <Page title="Balances">
        <CreateBalance />
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
