import React from 'react';
import PropTypes from 'prop-types';
import { CogIcon } from '@heroicons/react/solid';
import { PresentationChartLineIcon } from '@heroicons/react/outline';

const CurrencyInputHeader = ({ title, subtitle }) => {
  return (
    <div className="currency-input-header">
      <div className="currency-input-header__layout">
        {/* {setIsChartDisplayed && (
          <ColoredIconButton>
            {isChartDisplayed ? (
              <ChartDisableIcon color="textSubtle" />
            ) : (
              <ChartIcon width="24px" color="textSubtle" />
            )}
          </ColoredIconButton>
        )} */}
        <PresentationChartLineIcon className="w-6 h-6 mr-5" />
        <div className="currency-input-header__label-wrapper">
          <h2 className="currency-input-header__heading{">{title}</h2>
          <div className="currency-input-header__sub-heading-wrap">
            <p className="text-sm">{subtitle}</p>
          </div>
        </div>
        <div className="currency-input-header__actions">
          <CogIcon className="w-6 h-6 mr-0" />
          <i className="text-2xl las la-history" />
        </div>
      </div>
    </div>
  );
};
CurrencyInputHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};
export default CurrencyInputHeader;
