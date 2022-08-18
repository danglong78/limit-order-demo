import React from 'react';
import { useSelector } from 'react-redux';

import {
  selectModalProps,
  selectModalStack,
} from 'states/modal/modal.selector';

import { AppModalConfig } from './GlobalModals.config';

const AppModal = () => {
  const modalStack = useSelector(selectModalStack);
  const modalProps = useSelector(selectModalProps);

  return (
    <>
      {modalStack.map((modalKey) => {
        const props = modalProps[modalKey];
        const Modal = AppModalConfig[modalKey];
        return <Modal key={modalKey} {...props} />;
      })}
    </>
  );
};

export default AppModal;
