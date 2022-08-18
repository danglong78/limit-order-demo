/* eslint-disable no-param-reassign */
import { FetchStatus } from 'constants/fetchStatus.constant';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { FormatTypes } from '@ethersproject/abi';
import useSWR, { unstable_serialize } from 'swr';

export const fetchStatusMiddleware = (useSWRNext) => {
  return (key, fetcher, config) => {
    const swr = useSWRNext(key, fetcher, config);
    return Object.defineProperty(swr, 'status', {
      get() {
        let status = FetchStatus.Idle;

        if (!swr.isValidating && !swr.error && !swr.data) {
          status = FetchStatus.Idle;
        } else if (swr.isValidating && !swr.error && !swr.data) {
          status = FetchStatus.Fetching;
        } else if (swr.data) {
          status = FetchStatus.Fetched;
        } else if (swr.error && !swr.data) {
          status = FetchStatus.Failed;
        }
        return status;
      },
    });
  };
};

const getContractKey = (key) => {
  if (Array.isArray(key)) {
    const [contract, methodName, params] = key || [];
    return {
      contract,
      methodName,
      params,
    };
  }
  return key;
};

const serializesContractKey = (key) => {
  const { contract, methodName, params } = getContractKey(key) || {};
  const serializedKeys =
    key && contract && methodName
      ? {
          address: contract.address,
          interfaceFormat: contract.interface.format(FormatTypes.full),
          methodName,
          callData: contract.interface.encodeFunctionData(methodName, params),
        }
      : null;
  return serializedKeys;
};

/**
 * @example
 * const key = [contract, 'methodName', [params]]
 * const key = { contract, methodName, params }
 * const { data, error, mutate } = useSWRContract(key)
 */
export function useSWRContract(key, config = {}) {
  const { contract, methodName, params } = getContractKey(key) || {};
  const serializedKeys = useMemo(() => serializesContractKey(key), [key]);

  return useSWR(
    serializedKeys,
    async () => {
      if (!contract || !methodName) return null;
      if (!params) return contract[methodName]();
      return contract[methodName](...params);
    },
    config
  );
}

export const immutableMiddleware = (useSWRNext) => (key, fetcher, config) => {
  config.revalidateOnFocus = false;
  config.revalidateIfStale = false;
  config.revalidateOnReconnect = false;
  return useSWRNext(key, fetcher, config);
};

export const localStorageMiddleware =
  (useSWRNext) => (key, fetcher, config) => {
    const swr = useSWRNext(key, fetcher, config);
    const { data } = swr;
    const serializedKey = useMemo(() => unstable_serialize(key), [key]);

    useEffect(() => {
      if (data) {
        try {
          const stringify = JSON.stringify(data);
          localStorage?.setItem(serializedKey, stringify);
        } catch (error) {
          //
        }
      }
    }, [data, serializedKey]);

    let localStorageDataParsed;

    if (!data) {
      const localStorageData = localStorage?.getItem(serializedKey);

      if (localStorageData) {
        try {
          localStorageDataParsed = JSON.parse(localStorageData);
        } catch (error) {
          localStorage?.removeItem(serializedKey);
        }
      }
    }

    return Object.defineProperty(swr, 'data', {
      value: data || localStorageDataParsed,
    });
  };

// This is a SWR middleware for keeping the data even if key changes.
export const laggyMiddleware = (useSWRNext) => {
  return (key, fetcher, config) => {
    // Use a ref to store previous returned data.
    const laggyDataRef = useRef();

    // Actual SWR hook.
    const swr = useSWRNext(key, fetcher, config);

    useEffect(() => {
      // Update ref if data is not undefined.
      if (swr.data !== undefined) {
        laggyDataRef.current = swr.data;
      }
    }, [swr.data]);

    // Expose a method to clear the laggy data, if any.
    const resetLaggy = useCallback(() => {
      laggyDataRef.current = undefined;
    }, []);

    // Fallback to previous data if the current data is undefined.
    const dataOrLaggyData =
      swr.data === undefined ? laggyDataRef.current : swr.data;

    // Is it showing previous data?
    const isLagging =
      swr.data === undefined && laggyDataRef.current !== undefined;

    // Also add a `isLagging` field to SWR.
    Object.defineProperty(swr, 'isLagging', {
      value: isLagging,
    });
    Object.defineProperty(swr, 'resetLaggy', {
      value: resetLaggy,
    });
    Object.defineProperty(swr, 'data', {
      value: dataOrLaggyData,
    });
    return swr;
  };
};

// dev only
export const loggerMiddleware = (useSWRNext) => {
  return (key, fetcher, config) => {
    // Add logger to the original fetcher.
    const extendedFetcher = fetcher
      ? (...args) => {
          // eslint-disable-next-line no-console
          console.debug('SWR Request:', key);
          return fetcher(...args);
        }
      : null;

    // Execute the hook with the new fetcher.
    return useSWRNext(key, extendedFetcher, config);
  };
};
