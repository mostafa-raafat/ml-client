// i18n
import 'Locales/i18n';
// scroll bar
import 'simplebar/src/simplebar.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// editor
import 'react-quill/dist/quill.snow.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

import PropTypes from 'prop-types';
import cookie from 'cookie';
// next
import Head from 'next/head';
import App from 'next/app';
// @mui
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// react query
import { dehydrate, Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
// contexts
import { SettingsProvider } from 'Contexts/SettingsContext';
import { CollapseDrawerProvider } from 'Contexts/CollapseDrawerContext';
import { AuthProvider } from 'Contexts/AuthContext';
// theme
import ThemeProvider from 'Theme/index';
// utils
import { getSettings } from 'Utils/settings';
// Service
import queries from 'Services/queries';
// components
import Settings from 'Components/settings';
import RtlLayout from 'Components/RtlLayout';
import ProgressBar from 'Components/ProgressBar';
import ThemeColorPresets from 'Components/ThemeColorPresets';
import MotionLazyContainer from 'Components/animate/MotionLazyContainer';
import NotistackProvider from 'Components/NotistackProvider';
import ThemeLocalization from 'Components/ThemeLocalization';
import { ChartStyle } from 'Components/chart';

// ----------------------------------------------------------------------

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
  settings: PropTypes.object,
};

const queryClient = new QueryClient();

export default function MyApp(props) {
  const { Component, pageProps, settings } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Hydrate state={pageProps.dehydratedState}>
          <AuthProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CollapseDrawerProvider>
                <SettingsProvider defaultSettings={settings}>
                  <ThemeProvider>
                    <NotistackProvider>
                      <MotionLazyContainer>
                        <ThemeColorPresets>
                          <ThemeLocalization>
                            <RtlLayout>
                              <ChartStyle />
                              <Settings />
                              <ProgressBar />
                              {getLayout(<Component {...pageProps} />)}
                            </RtlLayout>
                          </ThemeLocalization>
                        </ThemeColorPresets>
                      </MotionLazyContainer>
                    </NotistackProvider>
                  </ThemeProvider>
                </SettingsProvider>
              </CollapseDrawerProvider>
            </LocalizationProvider>
          </AuthProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

// ----------------------------------------------------------------------

MyApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context);
  const cookies = cookie.parse(context.ctx.req ? context.ctx.req.headers.cookie || '' : document.cookie);
  const settings = getSettings(cookies);

  // get all balances
  // await queryClient.prefetchQuery('balances', () => queries.getBalances({ access }));

  return {
    ...appProps,
    settings,
  };
};
