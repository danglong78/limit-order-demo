import React from 'react';
import PropTypes from 'prop-types';

import { MODAL_KEY } from 'constants/modalKey.constant';
import useModal from 'hooks/useModal';
import useWalletConnect from 'hooks/useWalletConnect';

import { ButtonPrimary } from 'components/Button';
import { useTranslation } from 'next-i18next';

const ConnectWalletButton = ({ className, loading }) => {
  const { t } = useTranslation('common');
  const { connect } = useWalletConnect();
  const { toggleModal } = useModal(MODAL_KEY.WALLET_CONNECT);
  const handleToggleModal = () => {
    toggleModal({
      isVisible: true,
      props: { connect },
    });
  };

  return (
    <ButtonPrimary
      className={`w-48 ` + className}
      onClick={handleToggleModal}
      label="Connect wallet"
      loading={loading}
    >
      {t('connectWallet')}
    </ButtonPrimary>
  );
};

ConnectWalletButton.defaultProps = {
  className: '',
  loading: false,
};

ConnectWalletButton.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool,
};

export default ConnectWalletButton;
