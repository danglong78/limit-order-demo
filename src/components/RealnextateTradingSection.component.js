/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { BigNumber } from '@ethersproject/bignumber';

import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { useWeb3React } from '@web3-react/core';

import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber.util';
import { ellipseAddress } from 'utils/ellipseAddress.util';
import { numberWithCommas } from 'utils/format.util';
import withCatch from 'utils/withCatch.util';
import { ApprovalState } from 'constants/approvalState.constant';
import { MODAL_KEY } from 'constants/modalKey.constant';

import useModal from 'hooks/useModal';
import { useApproveCallback } from 'hooks/useApproveCallback';
import useAsyncWithLoading from 'hooks/useAsyncWithLoading';

import ConnectWalletButton from 'components/ConnectWalletButton.component';
import ProgressSteps from 'components/SwapSection/ProgressSteps.component';
import Input from 'components/Input/Input.component';
import CurrencyInputPanel from 'components/SwapSection/CurrencyInputPanel.component';
import { ButtonPrimary, ButtonThird } from './Button';

const spender = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

const RealnextateTradingSection = ({ currencyToken }) => {
  const { t } = useTranslation(['detail', 'common']);
  const { library, account } = useWeb3React();
  const { toggleModal } = useModal(MODAL_KEY.SELECT_TOKEN);

  const [amount, setAmount] = useState('');
  const [output, setOutput] = useState('');
  const [inputToken, setInputToken] = useState('');
  const [outputToken, setOutputToken] = useState('');

  const total = amount || '0';
  const priceInt = output || '0';
  const totalBigNumber = BigNumber.from(total);
  const priceBigNumber = BigNumber.from(priceInt);
  const [approval, approveCallback] = [false, () => {}];
  //  useApproveCallback({
  //   token: {
  //     ...currencyToken,
  //     amount: totalBigNumber.mul(BIG_TEN.pow(18)),
  //   },
  //   spender,
  // });
  const { excAsyncFunc: excTrade, loading } = useAsyncWithLoading({
    asyncFunc: async () => {},
  });

  // const { balance: buyBalance } = useCurrencyTokenBalance(
  //   currencyToken.address
  // );
  // const { balance: remainRNT } = useRNTBalance(spender);
  // const balance = buyBalance.div(BIG_TEN.pow(18));

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState(false);
  // const checkBalance = balance.gte(priceBigNumber.mul(totalBigNumber));
  const showApproveFlow = false;
  // (checkBalance && approval === ApprovalState.NOT_APPROVED) ||
  // approval === ApprovalState.PENDING ||
  // (approvalSubmitted && approval === ApprovalState.APPROVED);

  const onAmountChange = (value) => {
    setAmount(value);
  };

  const onPriceChange = (e) => {
    setOutput(e);
  };
  const isInfficientBalance = false;
  // balance.lt(priceBigNumber) ||
  // remainRNT.lte(BIG_ZERO) ||
  // remainRNT.div(BIG_TEN.pow(18)).lt(totalBigNumber);

  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true);
    }
  }, [approval, approvalSubmitted]);

  return (
    <div className="detail-page-sidebar detail__section">
      <div className="relative detail__section-label text-center">
        Limit order
      </div>
      {/* PRICE */}
      <span className="detail-page-sidebar__token flex justify-between">
        <span
          className="font-bold"
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
        <span>{inputToken}</span>
      </span>
      {/* </form> */}
      <CurrencyInputPanel
        value={amount}
        showMaxButton
        onUserInput={onAmountChange}
        onMax={() => {}}
        // onCurrencySelect={handleInputSelect}
        max={10000}
        id="swap-currency-input"
        disabled={approval === ApprovalState.PENDING}
      />
      <span className="detail-page-sidebar__token flex justify-between">
        <span
          className="font-bold"
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
        <span>{outputToken}</span>
      </span>
      <CurrencyInputPanel
        value={output}
        onUserInput={onPriceChange}
        // onCurrencySelect={handleInputSelect}
        max={10000}
        showMaxButton={false}
        id="swap-currency-input"
        disabled={approval === ApprovalState.PENDING}
      />
      {/* SUM */}
      <div className="detail-page-sidebar__info">
        <div className="detail-page-sidebar__total" />
        <div className="detail-page-sidebar__total-label">
          <span>Price</span>
          <span>
            {`${
              !Number.isNaN(parseInt(total)) &&
              !Number.isNaN(parseInt(priceInt))
                ? numberWithCommas(parseInt(total))
                : 0
            } ${currencyToken.name}`}
          </span>
        </div>
      </div>
      {/* SUBMIT */}
      <div className="swap-section__swap">
        {!account ? (
          <ConnectWalletButton className="!w-full" />
        ) : isInfficientBalance ? (
          <ButtonPrimary
            className={classNames('w-full disabled:opacity-60 overflow-hidden')}
            id="swap-button"
            disabled
            label={t('insufficientBalance')}
          >
            <p className="truncate">{t('insufficientBalance')}</p>
          </ButtonPrimary>
        ) : showApproveFlow ? (
          <div className="swap-section__approve">
            <ButtonThird
              className="flex-1 overflow-hidden"
              onClick={approveCallback}
              disabled={
                approval !== ApprovalState.NOT_APPROVED || approvalSubmitted
              }
              loading={approval === ApprovalState.PENDING}
              label="Approve"
            >
              <p className="truncate">
                {approval === ApprovalState.PENDING
                  ? t('enabling')
                  : approval === ApprovalState.APPROVED
                  ? t('enabled')
                  : t('enableToken', {
                      token: currencyToken.name,
                    })}
              </p>
            </ButtonThird>
            <ButtonPrimary
              className={classNames('flex-1 overflow-hidden')}
              onClick={excTrade}
              disabled={approval !== ApprovalState.APPROVED || total === 0}
              label="Trade"
              loading={loading}
            >
              <p className="truncate">{t('buy')} RNT</p>
            </ButtonPrimary>
          </div>
        ) : (
          <ButtonPrimary
            className={classNames('w-full overflow-hidden')}
            onClick={excTrade}
            disabled={approval !== ApprovalState.APPROVED || total === 0}
            label="Place order"
            loading={loading}
          >
            <p className="truncate">{t('buy')} RNT</p>
          </ButtonPrimary>
        )}
        {showApproveFlow && (
          <div className="swap-section__progress">
            <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />
          </div>
        )}
      </div>
    </div>
  );
};

RealnextateTradingSection.propTypes = {
  currencyToken: PropTypes.object.isRequired,
};

export default RealnextateTradingSection;
