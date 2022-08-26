import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ButtonSecondary } from 'components/Button';
import classNames from 'classnames';
import { Input as NumericalInput } from '../Input/TokenAmountInput.component';

const CurrencyInputPanel = ({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  id,
  max,
  disabled,
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <div id={id}>
      <div
        className={classNames('currency-input-panel', {
          'currency-input-panel--focus': focus,
        })}
      >
        <div className="currency-input-panel__input-wrap">
          <div className="currency-input-panel__input">
            <NumericalInput
              value={value}
              onUserInput={(val) => {
                onUserInput(val);
              }}
              max={max}
              disabled={disabled}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            />
          </div>
        </div>
        <div className="currency-input-panel__max-wrap">
          {showMaxButton && (
            <ButtonSecondary
              onClick={onMax}
              className="!px-3 !py-[4px] !uppercase"
              label="Max"
            >
              Max
            </ButtonSecondary>
          )}
        </div>
      </div>
    </div>
  );
};
CurrencyInputPanel.defaultProps = {
  value: null,
};

CurrencyInputPanel.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onUserInput: PropTypes.func.isRequired,
  onMax: PropTypes.func.isRequired,
  showMaxButton: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default CurrencyInputPanel;
