// scroll bar
import 'simplebar/src/simplebar.css';

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
import { SettingsProvider } from '../contexts/SettingsContext';
import { CollapseDrawerProvider } from '../contexts/CollapseDrawerContext';
// theme
import ThemeProvider from '../theme';
import GlobalStyles from '../theme/globalStyles';
// components
import Settings from '../components/settings';
import RtlLayout from '../components/RtlLayout';
import ProgressBar from '../components/ProgressBar';
import ThemeColorPresets from '../components/ThemeColorPresets';
import MotionLazyContainer from '../components/animate/MotionLazyContainer';

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
        <CollapseDrawerProvider>
          <ThemeProvider>
            <ThemeColorPresets>
              <RtlLayout>
                <MotionLazyContainer>
                  <NoSsr>
                    <Settings />
                  </NoSsr>
                  <GlobalStyles />
                  <ProgressBar />
                  {getLayout(<Component {...pageProps} />)}
                </MotionLazyContainer>
              </RtlLayout>
            </ThemeColorPresets>
          </ThemeProvider>
        </CollapseDrawerProvider>
      </SettingsProvider>
    </>
  );
};

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.any,
};

export default appWithTranslation(MyApp);
