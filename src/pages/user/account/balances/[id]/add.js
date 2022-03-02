// hooks
import AddBalance from 'Sections/flows/balances/add';
// components
import Page from 'Components/Page';

export default function Request() {
  return (
    <Page title="Balances - Add">
      <AddBalance />
    </Page>
  );
}
