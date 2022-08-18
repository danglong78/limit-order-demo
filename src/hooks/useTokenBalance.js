import { useWeb3React } from '@web3-react/core';

import { BIG_ZERO } from 'utils/bigNumber.util';
import { useTokenContract } from 'hooks/useContract';
import { useSWRContract } from 'hooks/useSWRContract';

export const FAST_INTERVAL = 10000;

export const useTokenBalance = (tokenAddress) => {
  const { account } = useWeb3React();

  const contract = useTokenContract(tokenAddress);
  const { data, status, ...rest } = useSWRContract(
    account
      ? {
          contract,
          methodName: 'balanceOf',
          params: [account],
        }
      : null,
    {
      refreshInterval: FAST_INTERVAL,
    }
  );

  return {
    ...rest,
    fetchStatus: status,
    balance: data || BIG_ZERO,
  };
};
