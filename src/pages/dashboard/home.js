// @mui
import { Grid, Container, Stack } from '@mui/material';
// i18next
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// hooks
import useSettings from 'Hooks/useSettings';
// layouts
import DashboardLayout from 'Layouts/dashboard';
// components
import Page from 'Components/Page';
// sections
import {
  BankingContacts,
  BankingWidgetSummary,
  BankingInviteFriends,
  BankingQuickTransfer,
  BankingCurrentBalance,
  BankingBalanceStatistics,
  BankingRecentTransitions,
  BankingExpensesCategories,
} from 'Sections/@dashboard/general/banking';
import useLocales from 'Hooks/useLocales';

// ----------------------------------------------------------------------

export default function Home(props) {
  const { themeStretch } = useSettings();
  const { translate } = useLocales('home');
  console.log(translate('title'));

  return (
    <Page title="General: Banking">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <BankingWidgetSummary
                title="Income"
                icon={'eva:diagonal-arrow-left-down-fill'}
                percent={2.6}
                total={18765}
                chartData={[111, 136, 76, 108, 74, 54, 57, 84]}
              />
              <BankingWidgetSummary
                title="Expenses"
                color="warning"
                icon={'eva:diagonal-arrow-right-up-fill'}
                percent={-0.5}
                total={8938}
                chartData={[111, 136, 76, 108, 74, 54, 57, 84]}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <BankingCurrentBalance />
          </Grid>

          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <BankingBalanceStatistics />
              <BankingExpensesCategories />
              <BankingRecentTransitions />
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <BankingQuickTransfer />
              <BankingContacts />
              <BankingInviteFriends />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['home'])),
  },
});

// ----------------------------------------------------------------------

Home.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
