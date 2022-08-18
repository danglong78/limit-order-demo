import { Contract } from '@ethersproject/contracts';
import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { BigNumber } from '@ethersproject/bignumber';
import { simpleRpcProvider } from 'utils/providers.util';

import ERC20 from 'abis/ERC20.json';

export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export const getSigner = (library, account) => {
  return library.getSigner(account).connectUnchecked();
};

export const getProviderOrSigner = (library, account) => {
  return account ? getSigner(library, account) : library;
};

export const getContract = (address, ABI, signer) => {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, signer ?? simpleRpcProvider);
};

export const getTokenContract = (address, signer) =>
  getContract(address, ERC20, signer);

export function calculateGasMargin(value) {
  return value
    .mul(BigNumber.from(10000).add(BigNumber.from(1000)))
    .div(BigNumber.from(10000));
}
