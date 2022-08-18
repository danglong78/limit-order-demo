import Metamask from 'components/Icons/MetamaskIcon.component';
import WalletConnect from 'components/Icons/WalletConnectIcon.component';
import CoinbaseWallet from 'components/Icons/CoinbaseWalletIcon.component';

import { ConnectorNames } from './WalletModal.types';

const connectors = [
  {
    title: 'Metamask',
    icon: Metamask,
    connectorId: ConnectorNames.Injected,
    priority: 1,
  },
  {
    title: 'WalletConnect',
    icon: WalletConnect,
    connectorId: ConnectorNames.WalletConnect,
    priority: 2,
  },
  {
    title: 'Coinbase',
    icon: CoinbaseWallet,
    connectorId: ConnectorNames.WalletLink,
    priority: 3,
  },
];

export default connectors;
export const connectorLocalStorageKey = 'connectorIdv2';
export const walletLocalStorageKey = 'wallet';
