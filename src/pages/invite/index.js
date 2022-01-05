import { Container, Typography } from '@mui/material';
// layouts
import Layout from 'Layouts/index';
// hooks
import useSettings from 'Hooks/useSettings';
// components
import Page from 'Components/Page';
import useLocales from 'Hooks/useLocales';

// ----------------------------------------------------------------------

export default function Invite() {
  const { themeStretch } = useSettings();
  const { allLang, currentLang, translate, onChangeLang } = useLocales();

  return (
    <Page title="Invite">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Invite
          <Typography variant="body1">{translate('demo.introduction')}</Typography>
        </Typography>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

Invite.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
