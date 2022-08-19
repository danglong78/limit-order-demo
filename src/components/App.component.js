import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { LOADING_KEY } from 'constants/loadingKey.constant';

import LoadingWrapper from 'components/LoadingWrapper.component';
import Notification from 'components/Notification.component';
import GlobalModals from 'components/GlobalModals/GlobalModals.component';
import useEagerConnect from 'hooks/useEagerConnect';
import DefaultLayout from 'layouts/Default.layout';

const App = ({ children }) => {
  useEagerConnect();

  const router = useRouter();

  useEffect(() => {
    const routeChangeComplete = () => {
      document.getElementById('app-loading-wrapper').scrollTo(0, 0);
    };
    router.events.on('routeChangeComplete', routeChangeComplete);
    return () => {
      router.events.off('routeChangeComplete', routeChangeComplete);
    };
  }, []);

  return (
    <>
      <LoadingWrapper loadingKeys={[LOADING_KEY.APP]}>
        <div id="app" className="app">
          <DefaultLayout>{children}</DefaultLayout>
        </div>
      </LoadingWrapper>
      <GlobalModals />
      <Notification />
    </>
  );
};

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
