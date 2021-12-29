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
// next
import Head from 'next/head';
// i18next
import { appWithTranslation } from 'next-i18next';
// @mui
import { NoSsr } from '@mui/material';
// contexts
import { SettingsProvider } from 'Contexts/SettingsContext';
import { CollapseDrawerProvider } from 'Contexts/CollapseDrawerContext';
import { AuthProvider } from 'Contexts/FirebaseContext';
import { FlowManagerProvider } from 'Contexts/FlowManagerContext';
// theme
import ThemeProvider from 'Theme/index';
import GlobalStyles from 'Theme/globalStyles';
// components
import Settings from 'Components/settings';
import RtlLayout from 'Components/RtlLayout';
import ProgressBar from 'Components/ProgressBar';
import ThemeColorPresets from 'Components/ThemeColorPresets';
import MotionLazyContainer from 'Components/animate/MotionLazyContainer';
import NotistackProvider from 'Components/NotistackProvider';
import { ChartStyle } from 'Components/chart';

// ----------------------------------------------------------------------

const MyApp = (props) => {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <SettingsProvider>
        <AuthProvider>
          <CollapseDrawerProvider>
            <FlowManagerProvider>
              <ThemeProvider>
                <ThemeColorPresets>
                  <RtlLayout>
                    <NotistackProvider>
                      <MotionLazyContainer>
                        <NoSsr>
                          <Settings />
                        </NoSsr>
                        <GlobalStyles />
                        <ChartStyle />
                        <ProgressBar />
                        {getLayout(<Component {...pageProps} />)}
                      </MotionLazyContainer>
                    </NotistackProvider>
                  </RtlLayout>
                </ThemeColorPresets>
              </ThemeProvider>
            </FlowManagerProvider>
          </CollapseDrawerProvider>
        </AuthProvider>
      </SettingsProvider>
    </>
  );
};

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.any,
};

export default appWithTranslation(MyApp);
