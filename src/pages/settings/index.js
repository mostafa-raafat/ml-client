import { Container, Typography } from '@mui/material';
// layouts
import DashboardLayout from 'Layouts/dashboard';
// hooks
import useSettings from 'Hooks/useSettings';
// components
import Page from 'Components/Page';

// ----------------------------------------------------------------------

export default function Settings() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Settings">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Settings
        </Typography>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

Settings.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
