import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToggle } from 'react-use';

import { toggleLoading } from 'states/loading/loading.action';
import { selectLoadingKeys } from 'states/loading/loading.selector';

import withCatch from 'utils/withCatch.util';

export default function useAsyncWithLoading({ asyncFunc, loadingKey = null }) {
  const dispatch = useDispatch();
  const appLoadingKeys = useSelector(selectLoadingKeys);
  const [localLoading, toggleLocalLoading] = useToggle(false);
  const [withCatchResult, setWithCatchResult] = useState([null, null]);

  const _toggleLoading = (isLoading) => {
    if (loadingKey) toggleLoading({ loadingKey, isLoading })(dispatch);
    else toggleLocalLoading(isLoading);
  };

  const excAsyncFunc = async (params) => {
    _toggleLoading(true);
    const result = await withCatch(asyncFunc(params));
    setWithCatchResult(result);
    _toggleLoading(false);
  };

  return {
    excAsyncFunc,
    result: withCatchResult[0],
    error: withCatchResult[1],
    loading: localLoading || appLoadingKeys[loadingKey],
  };
}
