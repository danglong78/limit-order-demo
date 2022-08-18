/* eslint-disable no-console */
import React from 'react';
import { useStore } from 'states/store';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';
import PropTypes from 'prop-types';
import { fetchStatusMiddleware } from 'hooks/useSWRContract';

import { Web3ReactProvider } from '@web3-react/core';
import { appWithTranslation } from 'next-i18next';
import NextNProgress from 'nextjs-progressbar';

import { getLibrary } from 'utils/web3React.util';

import 'fonts/line-awesome-1.3.0/css/line-awesome.min.css';
import 'styles/global.scss';
import App from 'components/App.component';
import ErrorBoundary from 'components/ErrorBoundary.component';

const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <SWRConfig
          value={{
            use: [fetchStatusMiddleware],
          }}
        >
          <ErrorBoundary>
            <App>
              <NextNProgress color="#8bd3d3" options={{ showSpinner: false }} />
              <Component {...pageProps} />
            </App>
          </ErrorBoundary>
        </SWRConfig>
      </Provider>
    </Web3ReactProvider>
  );
};

MyApp.defaultProps = {
  Component: null,
  pageProps: {},
};

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object,
};

export default appWithTranslation(MyApp);
