import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Select = React.forwardRef(
  ({ className, sizeClass, children, error, ...args }, ref) => {
    return (
      <select
        ref={ref}
        className={classNames(sizeClass, className, `select`, {
          'select--error': error,
        })}
        {...args}
      >
        {children}
      </select>
    );
  }
);

Select.defaultProps = {
  className: '',
  sizeClass: 'h-11',
  children: null,
  error: false,
};

Select.propTypes = {
  className: PropTypes.string,
  sizeClass: PropTypes.string,
  children: PropTypes.node,
  error: PropTypes.bool,
};

export default Select;
