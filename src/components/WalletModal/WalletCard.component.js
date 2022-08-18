import React from 'react';
import PropTypes from 'prop-types';
import { useWeb3React } from '@web3-react/core';

import {
  walletLocalStorageKey,
  connectorLocalStorageKey,
} from './WalletModal.config';

const WalletCard = ({ connect, walletConfig, onDismiss }) => {
  const { account } = useWeb3React();
  const { title, icon: Icon } = walletConfig;

  return (
    <button
      className="connect-modal__card"
      onClick={async () => {
        if (!account) {
          connect(walletConfig.connectorId);
          localStorage.setItem(walletLocalStorageKey, walletConfig.title);
          localStorage.setItem(
            connectorLocalStorageKey,
            walletConfig.connectorId
          );
        }
        onDismiss();
      }}
      id={`wallet-connect-${title.toLocaleLowerCase()}`}
    >
      <Icon className="connect-modal__icon" />
      <p className="connect-modal__label">{title}</p>
    </button>
  );
};

WalletCard.propTypes = {
  walletConfig: PropTypes.object.isRequired,
  connect: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
};
export default WalletCard;
