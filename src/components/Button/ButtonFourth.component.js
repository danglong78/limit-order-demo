import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from './Button.component';

const ButtonFourth = ({ className, ...args }) => {
  return (
    <Button
      className={classNames(className, 'button--fourth')}
      theme="fourth"
      {...args}
    />
  );
};

ButtonFourth.defaultProps = {
  className: '',
};

ButtonFourth.propTypes = {
  className: PropTypes.string,
};
export default ButtonFourth;
