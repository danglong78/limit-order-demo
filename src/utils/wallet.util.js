// Set of helper functions to facilitate wallet setup

import { toast } from 'react-hot-toast';
/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */

const blockExplorerUrl = 'https://ropsten.etherscan.io';

export const setupNetwork = async (externalProvider) => {
  const provider = externalProvider || window.ethereum;
  const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10);
  if (provider) {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      return true;
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${chainId.toString(16)}`,
                chainName: 'Ropsten Testnet',
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: [process.env.NEXT_PUBLIC_NODE_1],
                blockExplorerUrls: [blockExplorerUrl],
              },
            ],
          });
          return true;
        } catch (error) {
          toast.error(`Failed to setup the network in Metamask: ${error}`);
          return false;
        }
      }
      return false;
    }
  } else {
    toast.error(
      "Can't setup the BSC network on metamask because window.ethereum is undefined"
    );
    return false;
  }
};

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress,
  tokenSymbol,
  tokenDecimals
) => {
  const tokenAdded = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
      },
    },
  });

  return tokenAdded;
};
