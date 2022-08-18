import React, { useEffect, useState, memo } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const InputNumber = ({
  className,
  defaultValue,
  min,
  max,
  onChange,
  label,
  desc,
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    onChange && onChange(value);
  }, [value]);

  const handleClickDecrement = () => {
    if (min >= value) return;
    setValue((state) => state - 1);
  };
  const handleClickIncrement = () => {
    if (max && max <= value) return;
    setValue((state) => state + 1);
  };

  const renderLabel = () => {
    return (
      <div className="input-number__label-wrapper">
        <span className="input-number__label">{label}</span>
        {desc && <span className="input-number__description">{desc}</span>}
      </div>
    );
  };

  return (
    <div
      className={classNames('input-number__wrapper', className)}
      data-nc-id="NcInputNumber"
    >
      {label && renderLabel()}

      <div className="input-number__control">
        <button
          className="input-number__button"
          type="button"
          onClick={handleClickDecrement}
          disabled={min >= value}
        >
          <MinusIcon className="w-4 h-4" />
        </button>
        <span>{value}</span>
        <button
          className="input-number__button"
          type="button"
          onClick={handleClickIncrement}
          disabled={max ? max <= value : false}
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

InputNumber.defaultProps = {
  className: 'w-full',
  defaultValue: 0,
  min: 0,
  max: null,
  onChange: () => {},
  label: '',
  desc: '',
};

InputNumber.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,
  label: PropTypes.string,
  desc: PropTypes.string,
};

export default memo(InputNumber);
