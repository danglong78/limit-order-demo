import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Textarea = React.forwardRef(
  ({ className = '', rounded, fontClass, row, error, ...args }, ref) => {
    return (
      <textarea
        ref={ref}
        className={classNames('input', rounded, fontClass, className, {
          'input--error': error,
        })}
        rows={row}
        {...args}
      />
    );
  }
);

Textarea.defaultProps = {
  className: '',
  row: 4,
  fontClass: 'text-sm font-normal',
  rounded: 'rounded-2xl',
  type: 'text',
  error: false,
};

Textarea.propTypes = {
  className: PropTypes.string,
  row: PropTypes.number,
  fontClass: PropTypes.string,
  rounded: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.bool,
};

export default Textarea;
