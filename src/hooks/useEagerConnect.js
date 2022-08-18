import { useEffect } from 'react';
import useWalletConnect from 'hooks/useWalletConnect';
import { connectorLocalStorageKey } from 'components/WalletModal';

const useEagerConnect = () => {
  const { connect } = useWalletConnect();

  useEffect(() => {
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey);

    if (connectorId) {
      connect(connectorId);
    }
  }, [connect]);
};

export default useEagerConnect;
