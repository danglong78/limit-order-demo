import React, { Children, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import XIcon from '@heroicons/react/outline/XIcon';
import ChevronLeftIcon from '@heroicons/react/outline/ChevronLeftIcon';

import useModal from 'hooks/useModal';
import useDetectScreen from 'hooks/useDetectScreen';

import ButtonIconRaw from 'components/Button/ButtonIconRaw.component';

import { getSlot } from 'utils/slot.util';

const ModalLayout = ({
  modalKey,
  modalTitle,
  children,
  fullScreen,
  sidebar,
  bodyClassName,
}) => {
  const { toggleModal, isCurrentModal } = useModal(modalKey);
  const { mobileScreen, laptopScreen } = useDetectScreen();
  const [style, setStyle] = useState('');

  const handleCloseModal = () => {
    setStyle('');
    setTimeout(() => toggleModal({ isVisible: false }), 300);
  };

  const CloseIcon = !mobileScreen ? XIcon : ChevronLeftIcon;

  const childrenArray = Children.toArray(children);

  useEffect(() => {
    setStyle(`!opacity-100 ${mobileScreen ? '!translate-x-0' : ''}`);
  }, []);

  const modalHeader = getSlot({
    childrenArray,
    slotName: 'modalHeader',
  });

  const modalBody = getSlot({
    childrenArray,
    slotName: 'modalBody',
  });

  const modalFooter = getSlot({
    childrenArray,
    slotName: 'modalFooter',
  });

  return (
    <>
      {isCurrentModal && (
        <div className="modal__backdrop" onClick={handleCloseModal} />
      )}
      <div
        className={classNames([
          'modal',
          fullScreen && 'modal--fullscreen',
          sidebar && 'modal--sidebar',
          style,
          laptopScreen && !isCurrentModal && '!opacity-0',
        ])}
      >
        <div className="modal__header">
          {modalHeader ? (
            <> {modalHeader} </>
          ) : (
            <span className="modal__header-title">{modalTitle}</span>
          )}
          {!sidebar && (
            <ButtonIconRaw
              className="modal__header-close-icon"
              icon={CloseIcon}
              onClick={handleCloseModal}
              label="Close"
            />
          )}
        </div>
        {modalBody && (
          <div
            className={classNames([
              'modal__body',
              fullScreen && 'modal__body--fullscreen',
              bodyClassName,
            ])}
          >
            {modalBody}
          </div>
        )}
        {modalFooter && <div className="modal__footer">{modalFooter}</div>}
      </div>
    </>
  );
};

ModalLayout.Slot = () => null;

ModalLayout.defaultProps = {
  children: null,
  fullScreen: false,
  sidebar: false,
  modalTitle: '',
  bodyClassName: '',
};

ModalLayout.propTypes = {
  modalKey: PropTypes.string.isRequired,
  modalTitle: PropTypes.string,
  children: PropTypes.node,
  fullScreen: PropTypes.bool,
  sidebar: PropTypes.bool,
  bodyClassName: PropTypes.string,
};

export default ModalLayout;
