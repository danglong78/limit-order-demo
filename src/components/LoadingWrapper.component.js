import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Loading from 'components/Loading.component';

import { selectLoadingKeys } from 'states/loading/loading.selector';

import { LOADING_KEY } from 'constants/loadingKey.constant';

import useDetectScreen from 'hooks/useDetectScreen';

const LoadingWrapper = ({ size, children, loadingKeys, isLoading }) => {
  const appLoadingKeys = useSelector(selectLoadingKeys);
  const [loading, setLoading] = useState(false);
  const { mobileScreen } = useDetectScreen();

  const isAppLoading = !!loadingKeys.find(
    (loadingKey) => loadingKey === LOADING_KEY.APP
  );

  const defaultSize = !size && mobileScreen ? 'sm' : 'base';

  useEffect(() => {
    setLoading(
      isLoading ||
        (loadingKeys &&
          loadingKeys.length &&
          loadingKeys.some((loadingKey) => appLoadingKeys[loadingKey]))
    );
  }, [appLoadingKeys, isLoading]);

  return (
    <div
      id={
        loadingKeys.includes(LOADING_KEY.APP)
          ? 'app-loading-wrapper'
          : 'loading-wrapper'
      }
      className={classNames('loading-wrapper', {
        'overflow-auto': !loading,
        'overflow-hidden': loading,
      })}
    >
      {!!loading && (
        <div
          className={classNames('loading-wrapper__background', {
            fixed: isAppLoading,
            absolute: !isAppLoading,
          })}
        >
          <div className="loading-wrapper__loading">
            <Loading size={size || defaultSize} />
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

LoadingWrapper.defaultProps = {
  size: '',
  loadingKeys: [],
  children: null,
  isLoading: false,
};

LoadingWrapper.propTypes = {
  size: PropTypes.string,
  loadingKeys: PropTypes.array,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
};

export default LoadingWrapper;
