import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Checkbox = ({
  subLabel,
  label,
  name,
  className,
  defaultChecked,
  onChange,
  checked,
  value,
  labelClassName,
}) => {
  const [isChecked, setIsChecked] = useState(!!defaultChecked);
  return (
    <div className={classNames('checkbox__wrapper', className)}>
      <input
        id={name}
        name={name}
        type="checkbox"
        className="checkbox"
        defaultChecked={checked ? undefined : defaultChecked}
        checked={checked}
        value={value}
        onChange={() => {
          onChange && onChange(!isChecked);
          setIsChecked(!isChecked);
        }}
      />
      {label && (
        <label
          htmlFor={name}
          className={classNames('checkbox__name', labelClassName)}
        >
          <span className="checkbox__label">{label}</span>
          {subLabel && <p className="checkbox__sub-label">{subLabel}</p>}
        </label>
      )}
    </div>
  );
};

Checkbox.defaultProps = {
  className: '',
  defaultChecked: null,
  onChange: () => {},
  label: '',
  subLabel: '',
  name: '',
  checked: null,
  value: null,
  labelClassName: '',
};

Checkbox.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  subLabel: PropTypes.string,
  name: PropTypes.string,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  value: PropTypes.string,
  labelClassName: PropTypes.string,
};

export default memo(Checkbox);
