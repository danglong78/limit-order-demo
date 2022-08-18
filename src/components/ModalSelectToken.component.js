import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { useWeb3React } from '@web3-react/core';
import useModal from 'hooks/useModal';
import { MODAL_KEY } from 'constants/modalKey.constant';
import { getTokenContract, getProviderOrSigner } from 'utils/contract.util';
import ModalLayout from 'layouts/Modal.layout';
import Input from 'components/Input/Input.component';

const ModalSelectToken = ({ setTokenName }) => {
  const { library, account } = useWeb3React();
  const [inputAddress, setInputAddress] = useState('');
  const [inputToken, setInputToken] = useState('');

  const { toggleModal } = useModal(MODAL_KEY.SELECT_TOKEN);
  const debounceInput = useCallback(
    debounce(async (value) => {
      try {
        const contract = getTokenContract(
          value,
          getProviderOrSigner(library, account)
        );
        const name = await contract.symbol();
        console.log(
          '🚀 ~ file: ModalSelectToken.component.js ~ line 22 ~ debounce ~ name',
          name
        );
        name && setInputToken(name);
      } catch (err) {
        console.log(
          '🚀 ~ file: ModalSelectToken.component.js ~ line 16 ~ debounce ~ err',
          err
        );
      }
    }, 1000),
    []
  );
  return (
    <ModalLayout
      modalKey={MODAL_KEY.SELECT_TOKEN}
      modalTitle="Select token"
      bodyClassName="modal-edit-user"
    >
      <ModalLayout.Slot name="modalBody">
        <Input
          placeholder="Paste address"
          value={inputAddress}
          onChange={(e) => {
            setInputAddress(e.target.value);
            debounceInput(e.target.value);
          }}
        />
        <div
          className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4 mt-4"
          onClick={() => {
            if (inputToken) {
              setTokenName(inputToken);
              toggleModal({ isVisible: false });
            }
          }}
        >
          {inputToken}
        </div>
      </ModalLayout.Slot>
    </ModalLayout>
  );
};

ModalSelectToken.propTypes = {};

export default ModalSelectToken;
