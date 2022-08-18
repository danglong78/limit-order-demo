/* eslint-disable no-console */
import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import {
  getContract,
  getProviderOrSigner,
  getTokenContract,
} from 'utils/contract.util';

const useContract = (address, ABI) => {
  const { library, account } = useWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(address, ABI, getProviderOrSigner(library, account));
    } catch (error) {
      console.log(
        '🚀 ~ file: useContract.js ~ line 13 ~ returnuseMemo ~ error',
        error
      );
      return null;
    }
  }, [address, ABI, library, account]);
};

export default useContract;

export const useTokenContract = (address) => {
  const { library, account } = useWeb3React();
  return useMemo(
    () =>
      address &&
      getTokenContract(address, getProviderOrSigner(library, account)),
    [address, library, account]
  );
};
