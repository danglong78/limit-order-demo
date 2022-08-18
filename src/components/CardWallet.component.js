import RoundImage from 'components/RoundImage';
import React from 'react';
import PropTypes from 'prop-types';

import { formatNumberWithNotation } from 'utils/format.util';

const CardWallet = ({ className = '', money, unit, img }) => {
  return (
    <div className={`${className} account-tab__card-wallet`}>
      <div className="account-tab__card-wallet-text-wrapper">
        <h2 className="account-tab__card-wallet-money">
          <span>{formatNumberWithNotation(money)}</span>
        </h2>
        <span className="account-tab__card-wallet-text">{unit}</span>
      </div>

      <div className="account-tab__card-wallet-icon">
        <RoundImage sizeClass="w-7 h-7" imgUrl={img} />
      </div>
    </div>
  );
};

CardWallet.defaultProps = {
  className: '',
  money: '',
  unit: '',
  img: '/logo.svg',
};

CardWallet.propTypes = {
  className: PropTypes.string,
  money: PropTypes.number,
  unit: PropTypes.string,
  img: PropTypes.string,
};
export default CardWallet;
