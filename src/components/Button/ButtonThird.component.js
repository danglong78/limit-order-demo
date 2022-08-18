import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from './Button.component';

const ButtonThird = ({ className, ...args }) => {
  return (
    <Button
      className={classNames(className, 'button--third')}
      theme="third"
      {...args}
    />
  );
};

ButtonThird.defaultProps = {
  className: '',
};

ButtonThird.propTypes = {
  className: PropTypes.string,
};
export default ButtonThird;
