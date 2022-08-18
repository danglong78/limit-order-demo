import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Label = ({ className = '', children }) => {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={classNames('label', className)} data-nc-id="Label">
      {children}
    </label>
  );
};

Label.defaultProps = {
  className: '',
  children: undefined,
};

Label.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Label;
