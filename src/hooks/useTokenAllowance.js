import { useWeb3React } from '@web3-react/core';
import { BigNumber } from '@ethersproject/bignumber';

import { BIG_ZERO } from 'utils/bigNumber.util';
import { useTokenContract } from 'hooks/useContract';
import { useSWRContract } from 'hooks/useSWRContract';

export const FAST_INTERVAL = 10000;

const useTokenAllowance = (tokenAddress, spender) => {
  const { account } = useWeb3React();

  const contract = useTokenContract(tokenAddress);
  const { data, status, ...rest } = useSWRContract(
    account
      ? {
          contract,
          methodName: 'allowance',
          params: [account, spender],
        }
      : null,
    {
      refreshInterval: FAST_INTERVAL,
    }
  );

  return {
    ...rest,
    fetchStatus: status,
    allowance: data ? BigNumber.from(data.toString()) : BIG_ZERO,
  };
};

export default useTokenAllowance;
