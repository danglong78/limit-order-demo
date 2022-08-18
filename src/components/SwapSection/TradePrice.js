import React from 'react';
import PropTypes from 'prop-types';
import { RefreshIcon } from '@heroicons/react/outline';

const TradePrice = ({ price, showInverted }) => {
  const formattedPrice = 0.12489;

  const show = Boolean(price.baseCurrency && price.quoteCurrency);
  const label = showInverted
    ? `${price.quoteCurrency.symbol} per ${price.baseCurrency.symbol}`
    : `${price.baseCurrency?.symbol} per ${price.quoteCurrency.symbol}`;

  return (
    <p className="swap-section__trade-price-wrap">
      {show ? (
        <>
          {formattedPrice ?? '-'} {label}
          <div className="swap-section__trade-price" onClick={() => {}}>
            <RefreshIcon className="w-4 h-44" />
          </div>
        </>
      ) : (
        '-'
      )}
    </p>
  );
};
TradePrice.propTypes = {
  price: PropTypes.object.isRequired,
  showInverted: PropTypes.bool.isRequired,
};
export default TradePrice;
