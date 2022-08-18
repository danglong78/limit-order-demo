/* eslint-disable no-lonely-if */
import { useCallback } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector';
import { toast } from 'react-hot-toast';

import { connectorLocalStorageKey } from 'components/WalletModal';
import { connectorsByName } from 'utils/web3React.util';
import { setupNetwork } from 'utils/wallet.util';
import { clearUserStates } from 'utils/clearUserStates.util';

const useWalletConnect = () => {
  const { activate, deactivate } = useWeb3React();
  const connect = useCallback(
    async (connectorID) => {
      const connector = connectorsByName[connectorID];
      if (connector) {
        await activate(connector, async (error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork();
            if (hasSetup) {
              activate(connector);
            }
          } else {
            window.localStorage.removeItem(connectorLocalStorageKey);
            if (error instanceof NoEthereumProviderError) {
              toast.error('Provider Error: No provider was found');
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector;
                walletConnector.walletConnectProvider = null;
              }
              toast.error(
                `Authorization Error: Please authorize to access your account`
              );
            } else {
              toast.error(`${error.name}: ${error.message}`);
            }
          }
        });
      } else {
        toast.error('Unable to find connector: The connector config is wrong');
      }
    },
    [activate]
  );

  const disconnect = useCallback(() => {
    deactivate();
    clearUserStates();
  }, [deactivate]);

  return { connect, disconnect };
};

export default useWalletConnect;
