// hooks
import CreateBalance from 'Sections/flows/create-balance';
// components
import Page from 'Components/Page';

export default function Balances() {
  return (
    <Page title="Send">
      <CreateBalance />
    </Page>
  );
}
