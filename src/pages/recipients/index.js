// @mui
import { Container, Typography } from '@mui/material';
// layouts
import Layout from 'Layouts/index';
// hooks
import useSettings from 'Hooks/useSettings';
// components
import Page from 'Components/Page';

// ----------------------------------------------------------------------

export default function Recipients() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Recipients">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Recipients
        </Typography>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

Recipients.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
