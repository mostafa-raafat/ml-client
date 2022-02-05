// cookies
import cookie from 'cookie';
import { Container, Typography, Stack, Box, Button, Avatar } from '@mui/material';
import { useTheme } from '@mui/system';
// react query
import { dehydrate, QueryClient } from 'react-query';
// services
import { getBalance } from 'Services/query/useBalance/api';
// layouts
import Layout from 'Layouts/index';
// guards
import AuthGuard from 'Guards/AuthGuard';
// hooks
import useSettings from 'Hooks/useSettings';
// components
import Page from 'Components/Page';
// config
import { AWS_PACKET_API } from 'Config/index';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from 'Routes/paths';

// ----------------------------------------------------------------------

export default function Balance({ isAuthenticated }) {
  const router = useRouter();
  const { themeStretch } = useSettings();
  const theme = useTheme();

  const { id: balanceId, amount, code } = router.query;

  const goTo = (pathname, query) =>
    router.push(
      {
        pathname,
        query,
      },
      pathname
    );

  return (
    <AuthGuard isAuthenticated={isAuthenticated}>
      <Page title="Balance">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Stack alignItems="flex-end" flexDirection="row" justifyContent="space-between">
            <Box display="flex" alignItems="center" flexDirection="row" gap={2}>
              <Avatar
                src={`${AWS_PACKET_API}/currencies/${code.toLowerCase()}.png`}
                alt={code}
                sx={{ width: theme.spacing(6), height: theme.spacing(6) }}
              />
              <Box>
                <Typography variant="body" color="text.secondary" component="div" sx={{ m: 0 }}>
                  {code}
                </Typography>
                <Typography variant="h5" color="primary.main" component="div" sx={{ m: 0 }}>
                  {amount} {code}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
              <Button
                variant="outlined"
                onClick={() => goTo(`${PATH_DASHBOARD.user.balances}/${balanceId}/add`, { code, amount })}
              >
                Add
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.push(`${PATH_DASHBOARD.user.balances}/${balanceId}/convert`)}
              >
                Convert
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.push(`${PATH_DASHBOARD.user.balances}/${balanceId}/send`)}
              >
                Send
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.push(`${PATH_DASHBOARD.user.balances}/${balanceId}/request`)}
              >
                Request
              </Button>
              <Button variant="outlined">More</Button>
            </Box>
          </Stack>
        </Container>
      </Page>
    </AuthGuard>
  );
}

// ----------------------------------------------------------------------

Balance.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export async function getServerSideProps({ req, query }) {
  const cookies = cookie.parse(req.headers.cookie ?? '');
  const access = cookies.access ?? false;
  const { id } = query;
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
