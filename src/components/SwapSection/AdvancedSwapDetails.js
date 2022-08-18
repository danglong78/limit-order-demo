import React from 'react';
import PropTypes from 'prop-types';

const TradeSummary = () => {
  // const { priceImpactWithoutFee, realizedLPFee } =
  //   computeTradePriceBreakdown(trade);
  // const isExactIn = trade.tradeType === TradeType.EXACT_INPUT;
  // const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(
  //   trade,
  //   allowedSlippage
  // );

  return (
    <div className="advanced-swap-details__list ">
      <div className="advanced-swap-details__row">
        <div className="advanced-swap-details__text">
          <p fontSize="14px" color="textSubtle">
            Minimum received
          </p>
          {/* <QuestionHelper
            text={t(
              'Your transaction will revert if there is a large, unfavorable price movement before it is confirmed.',
            )}
            ml="4px"
            placement="top-start"
          /> */}
        </div>
        <div className="advanced-swap-details__text">
          <p fontSize="14px">
            {/* {isExactIn
              ? `${slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4)} ${
                  trade.outputAmount.currency.symbol
                }` ?? '-'
              : `${slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4)} ${
                  trade.inputAmount.currency.symbol
                }` ?? '-'} */}
            abccd
          </p>
        </div>
      </div>

      <div className="advanced-swap-details__row">
        <div className="advanced-swap-details__text">
          <p fontSize="14px" color="textSubtle">
            Liquidity Provider Fee
          </p>
          {/* <QuestionHelper
            text={
              <>
                <Text mb="12px">
                  {t('For each trade a %amount% fee is paid', {
                    amount: '0.25%',
                  })}
                </Text>
                <Text>
                  - {t('%amount% to LP token holders', { amount: '0.17%' })}
                </Text>
                <Text>
                  - {t('%amount% to the Treasury', { amount: '0.03%' })}
                </Text>
                <Text>
                  -{' '}
                  {t('%amount% towards CAKE buyback and burn', {
                    amount: '0.05%',
                  })}
                </Text>
              </>
            }
            ml="4px"
            placement="top-start"
          /> */}
        </div>
        <p fontSize="14px">
          {/* {realizedLPFee
            ? `${realizedLPFee.toSignificant(4)} ${
                trade.inputAmount.currency.symbol
              }`
            : '-'} */}
          12 BNB
        </p>
      </div>
    </div>
  );
};

const AdvancedSwapDetails = ({ trade }) => {
  // const [allowedSlippage] = useUserSlippageTolerance();

  const showRoute = Boolean(trade && trade.route.path.length > 2);

  return (
    <div className="grid auto-rows-auto">
      {trade && (
        <>
          <TradeSummary trade={trade} />
          {showRoute ||
            (true && (
              <div className="advanced-swap-details__route ">
                <span className="flex items-center">
                  <p fontSize="14px" color="textSubtle">
                    Route
                  </p>
                  {/* <QuestionHelper
                    text={t(
                      'Routing through these tokens resulted in the best price for your trade.'
                    )}
                    ml="4px"
                    placement="top-start"
                  /> */}
                </span>
                BNB to CAKE
              </div>
            ))}
        </>
      )}
    </div>
  );
};

AdvancedSwapDetails.propTypes = {
  trade: PropTypes.object.isRequired,
};
export default AdvancedSwapDetails;
