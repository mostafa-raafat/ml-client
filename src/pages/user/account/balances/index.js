// @mui
import { Container } from '@mui/material';
// layouts
import FlowLayout from 'Layouts/FlowLayout';
// hooks
import useSettings from 'Hooks/useSettings';
// hooks
import CreateBalance from 'Sections/flows/create-balance';
// components
import Page from 'Components/Page';

export default function Balances() {
  const { themeStretch } = useSettings();
  return (
    <Page title="Send">
      <CreateBalance />
    </Page>
  );
}

// ----------------------------------------------------------------------

Balances.getLayout = function getLayout(page) {
  return <FlowLayout>{page}</FlowLayout>;
};
