import { Container, Typography } from '@mui/material';
// layouts
import Layout from 'Layouts/index';
// hooks
import useSettings from 'Hooks/useSettings';
// components
import Page from 'Components/Page';

// ----------------------------------------------------------------------

Balance.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Balance() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Settings">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Balance
        </Typography>
      </Container>
    </Page>
  );
}
