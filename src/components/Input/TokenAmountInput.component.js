import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line prefer-regex-literals
const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`);
// match escaped "." characters via in a non-capturing group
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

export const Input = React.memo(function InnerInput({
  value,
  onUserInput,
  ...rest
}) {
  const enforcer = (nextUserInput) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      onUserInput(nextUserInput);
    }
  };

  return (
    <input
      className="currency-input"
      {...rest}
      value={value}
      onChange={(event) => {
        // replace commas with periods, because we exclusively uses period as the decimal separator
        enforcer(event.target.value.replace(/,/g, '.'));
      }}
      // universal input options
      inputMode="decimal"
      title="Token Amount"
      autoComplete="off"
      autoCorrect="off"
      // text-specific options
      type="text"
      pattern="^[0-9]*[.,]?[0-9]*$"
      placeholder="0.0"
      minLength={1}
      maxLength={79}
      spellCheck="false"
    />
  );
});

Input.defaultProps = {
  value: '',
};

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onUserInput: PropTypes.func.isRequired,
};
