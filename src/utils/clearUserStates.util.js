import { connectorLocalStorageKey } from 'components/WalletModal';
import { connectorsByName } from 'utils/web3React.util';

export const clearUserStates = () => {
  if (window.localStorage.getItem('walletconnect')) {
    connectorsByName.walletconnect.close();
    connectorsByName.walletconnect.walletConnectProvider = null;
  }
  localStorage.removeItem(connectorLocalStorageKey);
};
