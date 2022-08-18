import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Button from './Button.component';

const ButtonSecondary = ({ className, ...args }) => {
  const btnSecondaryclass = classNames('button--secondary', className);
  return <Button className={btnSecondaryclass} {...args} theme="secondary" />;
};

ButtonSecondary.defaultProps = {
  className: '',
};

ButtonSecondary.propTypes = {
  className: PropTypes.string,
};

export default ButtonSecondary;
