import React from 'react';
import PropTypes from 'prop-types';

const RadioButton = ({ name, id, label, defaultChecked }) => {
  return (
    <div className="radio-button__wrapper">
      <input
        defaultChecked={defaultChecked}
        id={id + name}
        name={name}
        type="radio"
        className="radio-button_input"
      />
      <label htmlFor={id + name} className="radio-button__label">
        {label}
      </label>
    </div>
  );
};

RadioButton.defaultProps = {
  id: '',
  defaultChecked: null,
  label: '',
  name: '',
};

RadioButton.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  defaultChecked: PropTypes.bool,
  id: PropTypes.string,
};

export default RadioButton;
