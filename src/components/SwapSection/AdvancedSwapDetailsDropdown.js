import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import AdvancedSwapDetails from './AdvancedSwapDetails';

const AdvancedSwapDetailsDropdown = ({ trade, ...rest }) => {
  // const lastTrade = useLastTruthy(trade);

  return (
    <div
      className={classNames(' advanced-swap-details-dropdown', {
        'advanced-swap-details-dropdown--show': Boolean(trade),
      })}
    >
      <AdvancedSwapDetails {...rest} trade={trade ?? undefined} />
    </div>
  );
};
AdvancedSwapDetailsDropdown.propTypes = {
  trade: PropTypes.object.isRequired,
};

export default AdvancedSwapDetailsDropdown;
