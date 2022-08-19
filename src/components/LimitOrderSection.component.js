/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { BigNumber } from '@ethersproject/bignumber';

import classNames from 'classnames';
import { useWeb3React } from '@web3-react/core';

import { getSigner, getContract } from 'utils/contract.util';
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber.util';
import withCatch from 'utils/withCatch.util';
import { placeLimitOrder } from 'utils/limitOrder.util';
import { MODAL_KEY } from 'constants/modalKey.constant';
import ERC20 from 'abis/ERC20.json';
import availableHandler from 'constants/handler.constant';
import useModal from 'hooks/useModal';
import useAsyncWithLoading from 'hooks/useAsyncWithLoading';

import ConnectWalletButton from 'components/ConnectWalletButton.component';
import Select from 'components/Input/Select.component';
import CurrencyInputPanel from 'components/SwapSection/CurrencyInputPanel.component';
import { ButtonPrimary, ButtonThird } from './Button';

const spender = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

const LimitOrderSection = ({ handler, setHandler }) => {
  const { library, account } = useWeb3React();
  const { toggleModal } = useModal(MODAL_KEY.SELECT_TOKEN);

  const [amount, setAmount] = useState('');
  const [output, setOutput] = useState('');
  const [inputToken, setInputToken] = useState('');
  const [outputToken, setOutputToken] = useState('');

  const { excAsyncFunc: excTrade, loading } = useAsyncWithLoading({
    asyncFunc: async () => {
      const signer = getSigner(library, account);
      const inputContract = getContract(inputToken, ERC20, signer);
      const outputContract = getContract(outputToken, ERC20, signer);
      const inputDecimal = await inputContract.inputContract();
      const outputDecimal = await outputContract.inputContract();
      const [tx, placeError] = await withCatch(
        placeLimitOrder(
          inputToken,
          outputToken,
          BigNumber.from(amount).mul(BIG_TEN).pow(inputDecimal),
          BigNumber.from(output).mul(BIG_TEN).pow(outputDecimal),
          signer,
          handler
        )
      );
      if (placeError) {
        toast.error(placeError.message);
        return;
      }
      const [, txError] = await withCatch(tx.wait());
      if (txError) {
        toast.error(txError.message);
      }
    },
  });

  const onAmountChange = (value) => {
    setAmount(value);
  };

  const onPriceChange = (e) => {
    setOutput(e);
  };
  const isInfficientBalance =
    !amount || !output || !inputToken || outputToken || !handler;

  return (
    <div className="detail-page-sidebar detail__section">
      <div className="relative detail__section-label text-center">
        Limit order
      </div>
      {/* PRICE */}
      <Select
        onChange={(e) => {
          setHandler(e.target.value);
        }}
        value={handler}
      >
        {availableHandler.map((h) => (
          <option value={h} key={h}>
            {h}
          </option>
        ))}
      </Select>
      <span className="detail-page-sidebar__token flex justify-between">
        <span
          className="font-bold cursor-pointer hover:bg-secondary-50 hover:dark:bg-secondary-800 p-2 rounded-xl"
          onClick={() => {
            toggleModal({
              isVisible: true,
              props: {
                setTokenName: setInputToken,
              },
            });
          }}
        >
          Select token
        </span>
        <span className="text-lg font-bold">{inputToken}</span>
      </span>
      {/* </form> */}
      <CurrencyInputPanel
        value={amount}
        showMaxButton={false}
        onUserInput={onAmountChange}
        onMax={() => {}}
        // onCurrencySelect={handleInputSelect}
        max={1000000000000}
        id="swap-currency-input"
      />
      <span className="detail-page-sidebar__token flex justify-between">
        <span
          className="font-bold cursor-pointer hover:bg-secondary-50 hover:dark:bg-secondary-800 p-2 rounded-xl"
          onClick={() => {
            toggleModal({
              isVisible: true,
              props: {
                setTokenName: setOutputToken,
              },
            });
          }}
        >
          Select token
        </span>
        <span className="text-lg font-bold">{outputToken}</span>
      </span>
      <CurrencyInputPanel
        value={output}
        onUserInput={onPriceChange}
        onMax={() => {}}
        max={1000000000000}
        showMaxButton={false}
        id="swap-currency-input"
      />
      {/* SUM */}

      {/* SUBMIT */}
      <div className="swap-section__swap">
        {!account ? (
          <ConnectWalletButton className="!w-full" />
        ) : isInfficientBalance ? (
          <ButtonPrimary
            className={classNames('w-full disabled:opacity-60 overflow-hidden')}
            id="swap-button"
            disabled
          >
            <p className="truncate">Invalid Input</p>
          </ButtonPrimary>
        ) : (
          <ButtonPrimary
            className={classNames('w-full overflow-hidden')}
            onClick={excTrade}
            label="Place order"
            loading={loading}
          >
            <p className="truncate">Place</p>
          </ButtonPrimary>
        )}
      </div>
    </div>
  );
};

LimitOrderSection.propTypes = {};

export default LimitOrderSection;
