/* eslint-disable no-console */
import { MaxUint256 } from '@ethersproject/constants';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { useToggle } from 'react-use';

import useTokenAllowance from 'hooks/useTokenAllowance';
import { useCurrencyContract } from 'hooks/useContract';
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice';

import { calculateGasMargin } from 'utils/contract.util';

import { ApprovalState } from 'constants/approvalState.constant';
import { FetchStatus } from 'constants/fetchStatus.constant';

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback({
  token,
  spender,
  useContract = useCurrencyContract,
}) {
  const { callWithGasPrice } = useCallWithGasPrice();
  const [loading, setLoading] = useToggle(false);

  const { allowance, fetchStatus } = useTokenAllowance(token.address, spender);

  // check the current approval status
  const approvalState = useMemo(() => {
    if (!token || !spender) return ApprovalState.UNKNOWN;
    // we might not have enough data to know whether or not we need to approve
    if (!fetchStatus === FetchStatus.Fetched) return ApprovalState.UNKNOWN;

    // token will be defined if currentAllowance is
    return allowance.lt(token.amount)
      ? loading
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED;
  }, [token.amount, allowance, spender]);

  const tokenContract = useContract(token.address);

  const approve = useCallback(async () => {
    setLoading(true);
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      toast.error('Error Approve was called unnecessarily');
      console.error('approve was called unnecessarily');
      return;
    }

    if (!tokenContract) {
      toast.error(`Error Cannot find contract of the token ${token?.address}`);
      console.error('tokenContract is null');
      return;
    }

    if (!token) {
      toast.error('Error Missing amount to approve');
      console.error('missing amount to approve');
      return;
    }

    if (!spender) {
      toast.error('Error No spender');
      console.error('no spender');
      return;
    }

    let useExact = false;

    const estimatedGas = await tokenContract.estimateGas
      .approve(spender, MaxUint256)
      .catch(() => {
        // general fallback for tokens who restrict approval amounts
        useExact = true;
        return tokenContract.estimateGas.approve(spender, token.amount);
      });

    // eslint-disable-next-line consistent-return
    return callWithGasPrice(
      tokenContract,
      'approve',
      [spender, useExact ? token.amount : MaxUint256],
      {
        gasLimit: calculateGasMargin(estimatedGas),
      }
    )
      .catch((error) => {
        console.error('Failed to approve token', error);
        if (error?.code !== 4001) {
          toast.error(`Error ${error.message}`);
        }
        throw error;
      })
      .finally(() => setLoading(false));
  }, [approvalState, tokenContract, token, spender, callWithGasPrice]);

  return [approvalState, approve];
}
