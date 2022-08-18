import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { XIcon } from '@heroicons/react/solid';
import twFocusClass from 'utils/twFocusClass.util';

const ButtonClose = ({ className, onClick }) => {
  const btnCloseClass = classNames('button--close', className, twFocusClass());
  return (
    <button className={btnCloseClass} onClick={onClick}>
      <span className="sr-only">Close</span>
      <XIcon className="w-5 h-5" />
    </button>
  );
};

ButtonClose.defaultProps = {
  className: '',
  onClick: () => {},
};

ButtonClose.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};
export default ButtonClose;
