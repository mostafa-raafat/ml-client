// @mui
import { Button, Container, Typography } from '@mui/material';
// layouts
import Layout from 'Layouts/index';
// hooks
import useSettings from 'Hooks/useSettings';
// components
import Page from 'Components/Page';
import Stepper from 'Components/Stepper';

// ----------------------------------------------------------------------

const Step = (props) => {
  const { label, key, handleNext } = props;
  return (
    <>
      <Typography sx={{ my: 1 }} key={key} label={label}>
        {label}
      </Typography>
      <Button variant="contained" onClick={handleNext} sx={{ mr: 1 }}>
        next
      </Button>
    </>
  );
};

export default function Send() {
  const { themeStretch } = useSettings();
  return (
    <Page title="Send">
      <Container maxWidth={themeStretch ? false : 'l'}>
        <Stepper>
          <Step key="1" label="Amount" urlHash="enterpayment" />
          <Step key="2" label="You" urlHash="senderdetails" />
          <Step key="3" label="Recipient" urlHash="recipient" />
          <Step key="4" label="Review" urlHash="review" />
          <Step key="5" label="Pay" urlHash="pay" />
        </Stepper>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

Send.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
