import { Container, Typography } from '@mui/material';
// layouts
import Layout from 'Layouts/index';
// hooks
import useSettings from 'Hooks/useSettings';
// components
import Page from 'Components/Page';

// ----------------------------------------------------------------------

export default function Profile() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Profile">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Profile
        </Typography>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
