import React from 'react';
import PropTypes from 'prop-types';

import { MODAL_KEY } from 'constants/modalKey.constant';
import useModal from 'hooks/useModal';
import ModalLayout from 'layouts/Modal.layout';

import config from './WalletModal.config';
import WalletCard from './WalletCard.component';
/**
 * Checks local storage if we have saved the last wallet the user connected with
 * If we find something we put it at the top of the list
 *
 * @returns sorted config
 */
const getPreferredConfig = (walletConfig) => {
  // const preferredWalletName = localStorage.getItem(walletLocalStorageKey);
  const sortedConfig = walletConfig.sort((a, b) => a.priority - b.priority);
  return sortedConfig;
};

const ConnectModal = ({ connect }) => {
  const { toggleModal } = useModal(MODAL_KEY.WALLET_CONNECT);
  const handleCloseModal = () => {
    toggleModal({ isVisible: false });
  };
  const sortedConfig = getPreferredConfig(config);

  return (
    <ModalLayout
      modalKey={MODAL_KEY.WALLET_CONNECT}
      modalTitle="Connect Wallet"
    >
      <ModalLayout.Slot name="modalBody">
        <div className="connect-modal">
          <div className="connect-modal__list">
            {sortedConfig.map((wallet) => (
              <div key={wallet.title}>
                <WalletCard
                  walletConfig={wallet}
                  connect={connect}
                  onDismiss={handleCloseModal}
                />
              </div>
            ))}
          </div>
        </div>
      </ModalLayout.Slot>
    </ModalLayout>
  );
};

ConnectModal.propTypes = {
  connect: PropTypes.func.isRequired,
};

export default ConnectModal;
