import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { ConnectorNames } from 'components/WalletModal/WalletModal.types';
import { hexlify } from '@ethersproject/bytes';
import { toUtf8Bytes } from '@ethersproject/strings';
import { Web3Provider } from '@ethersproject/providers';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

const POLLING_INTERVAL = 12000;
const rpcUrl = process.env.NEXT_PUBLIC_NODE_1;

const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10);

const injected = new InjectedConnector({ supportedChainIds: [chainId] });

const walletConnect = new WalletConnectConnector({
  rpc: {
    [chainId]: rpcUrl,
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

const walletLink = new WalletLinkConnector({
  url: rpcUrl,
  appName: 'Realnextate',
  appLogoUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/icon-512x512.png`,
  supportedChainIds: [chainId],
});

export const connectorsByName = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletConnect,
  [ConnectorNames.WalletLink]: walletLink,
};

export const getLibrary = (provider) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

export const signMessage = async ({ provider, account, message }) => {
  /**
   * Wallet Connect does not sign the message correctly unless you use their method
   * @see https://github.com/WalletConnect/walletconnect-monorepo/issues/462
   */
  if (provider.provider?.wc) {
    const wcMessage = hexlify(toUtf8Bytes(message));

    try {
      const signature = await provider.provider.wc.signPersonalMessage([
        wcMessage,
        account,
      ]);

      return signature;
    } catch (err) {
      return '';
    }
  }
  const rs = await provider.getSigner(account).signMessage(message);

  return rs;
};
