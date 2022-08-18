import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from './Button.component';

const ButtonPrimary = ({ className, ...args }) => {
  const btnPrimaryClass = classNames('button--primary', className);
  return <Button className={btnPrimaryClass} {...args} />;
};
ButtonPrimary.defaultProps = {
  className: '',
};

ButtonPrimary.propTypes = {
  className: PropTypes.string,
};

export default ButtonPrimary;
