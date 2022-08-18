import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Input = React.forwardRef(
  ({ className, sizeClass, fontClass, rounded, type, error, ...args }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={classNames(
          'input',
          rounded,
          fontClass,
          sizeClass,
          className,
          {
            'input--error': error,
          }
        )}
        {...args}
      />
    );
  }
);

Input.defaultProps = {
  className: '',
  sizeClass: 'h-11 px-4 py-3',
  fontClass: 'text-sm font-normal',
  rounded: 'rounded-2xl',
  type: 'text',
  error: false,
};

Input.propTypes = {
  className: PropTypes.string,
  sizeClass: PropTypes.string,
  fontClass: PropTypes.string,
  rounded: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.bool,
};

export default memo(Input);
