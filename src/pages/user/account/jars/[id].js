import { Container, Typography } from '@mui/material';
// layouts
import Layout from 'Layouts/index';
// hooks
import useSettings from 'Hooks/useSettings';
// components
import Page from 'Components/Page';

// ----------------------------------------------------------------------

Jar.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Jar() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Jar">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Jar
        </Typography>
      </Container>
    </Page>
  );
}
