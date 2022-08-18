import React from 'react';

import useModal from 'hooks/useModal';
import { MODAL_KEY } from 'constants/modalKey.constant';
import { CreditCardIcon } from '@heroicons/react/solid';

import ButtonCircle from 'components/Button/ButtonCircle.component';

const UserWallet = () => {
  const { toggleModal } = useModal(MODAL_KEY.USER_WALLET);

  return (
    <ButtonCircle
      onClick={() => toggleModal({ isVisible: true })}
      label="Download"
      className="button--primary"
      theme="primary"
    >
      <CreditCardIcon className="w-6 h-6" />
    </ButtonCircle>
  );
};

export default UserWallet;
