import React from 'react';
import Image from 'components/Image.component';
import PropTypes from 'prop-types';
import { MODAL_KEY } from 'constants/modalKey.constant';
import useModal from 'hooks/useModal';
import useDetectScreen from 'hooks/useDetectScreen';
import ModalLayout from 'layouts/Modal.layout';

import Warning from 'images/warning.svg';
import { ButtonPrimary, ButtonThird } from './Button';

const ModalConfirm = ({
  modalTitle,
  action,
  imgSrc,
  hideCancelBtn,
  title,
  subTitle,
}) => {
  const { toggleModal, closeAllModals } = useModal(MODAL_KEY.CONFIRM);
  const { mobileScreen } = useDetectScreen();

  const closeModal = () => {
    toggleModal({ isVisible: false });
  };

  const handleConfirm = () => {
    closeAllModals();
    action();
  };

  return (
    <ModalLayout modalKey={MODAL_KEY.CONFIRM} modalTitle={modalTitle}>
      <ModalLayout.Slot name="modalBody">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="px-8 md:px-0 md:max-w-[280px]">
            <Image src={imgSrc || Warning} />
          </div>
          <span className="font-bold text-lg md:text-2xl mt-6 text-center">
            {title }
          </span>
          <span className="font-semibold text-neutral-400 text-sm md:text-base mt-3 text-center">
            {subTitle}
          </span>
        </div>
      </ModalLayout.Slot>
      <ModalLayout.Slot name="modalFooter">
        <div className="flex justify-center gap-4">
          {!mobileScreen && !hideCancelBtn && (
            <ButtonThird
              onClick={closeModal}
              label={'Cancel'}
              className="flex-grow"
            >
              Cancel
            </ButtonThird>
          )}
          <ButtonPrimary
            onClick={handleConfirm}
            label='confirm'
            className="flex-grow"
          >
            Confirm
          </ButtonPrimary>
        </div>
      </ModalLayout.Slot>
    </ModalLayout>
  );
};

ModalConfirm.defaultProps = {
  imgSrc: null,
  hideCancelBtn: false,
  title: '',
  subTitle: '',
};

ModalConfirm.propTypes = {
  modalTitle: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  imgSrc: PropTypes.any,
  hideCancelBtn: PropTypes.bool,
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

export default ModalConfirm;
