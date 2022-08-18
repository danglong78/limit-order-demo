import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

import LocationIcon from 'components/Icons/LocationIcon.component';
import ClearDataButton from 'components/Button/ButtonClear.component';

const LocationInput = ({
  defaultValue,
  onChange,
  placeHolder = 'Location',
  desc = 'Where do you looking for to invest?',
  className = 'nc-flex-1.5',
}) => {
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const { t } = useTranslation(['common', 'home']);

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    onChange && onChange(value);
  }, [value]);

  return (
    <div className={`location-input ${className}`} ref={containerRef}>
      <div
        className="nc-hero-field-padding location-input__wrapper w-full"
        onClick={() => inputRef.current.focus()}
      >
        <LocationIcon />
        <div className="flex-grow">
          <input
            className="location-input__input"
            placeholder={t(placeHolder)}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            ref={inputRef}
          />
          <span className="location-input__placeholder">
            <span className="line-clamp-1">
              {value ? t(placeHolder) : t(desc, { ns: 'home' })}
            </span>
          </span>
          {value && <ClearDataButton onClick={() => setValue('')} />}
        </div>
      </div>
    </div>
  );
};

LocationInput.defaultProps = {
  defaultValue: '',
  onChange: () => {},
  placeHolder: 'searchEstate',
  desc: 'locationInputDes',
  className: 'nc-flex-1.5',
};

LocationInput.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  placeHolder: PropTypes.string,
  desc: PropTypes.string,
  className: PropTypes.string,
};

export default LocationInput;
