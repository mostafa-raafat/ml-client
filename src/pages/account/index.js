// @mui
import { Container, Typography } from '@mui/material';
// layouts
import Layout from 'Layouts/dashboard';
// hooks
import useSettings from 'Hooks/useSettings';
// components
import Page from 'Components/Page';

// ----------------------------------------------------------------------

export default function Account() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Account">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Account
        </Typography>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

Account.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
