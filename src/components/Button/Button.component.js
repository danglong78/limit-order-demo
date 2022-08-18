import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import twFocusClass from 'utils/twFocusClass.util';

import Loading from './Loading.component';

const Button = ({
  className,
  translate,
  sizeClass,
  fontSize,
  disabled,
  href,
  children,
  type,
  loading,
  onClick,
  label,
  theme,
}) => {
  const buttonClassName = classNames(
    'button',
    fontSize,
    sizeClass,
    translate,
    className,
    twFocusClass(true, theme)
  );

  if (href) {
    return (
      <Link href={href} passHref rel="noopener noreferrer">
        <a className={buttonClassName} onClick={onClick}>
          {children || `This is Link`}
        </a>
      </Link>
    );
  }

  return (
    <button
      disabled={disabled || loading}
      className={buttonClassName}
      onClick={onClick}
      type={type}
      aria-label={label}
    >
      {loading && <Loading />}
      {children || `This is Button`}
    </button>
  );
};

Button.defaultProps = {
  className:
    'text-neutral-700 dark:text-neutral-200 transition-colors duration-500',
  translate: '',
  sizeClass: 'px-3 py-2 sm:px-4 sm:py-3 md:px-6',
  fontSize: 'text-sm sm:text-base font-semibold',
  disabled: false,
  href: '',
  loading: false,
  onClick: () => {},
  type: 'button',
  theme: 'primary',
};

Button.propTypes = {
  className: PropTypes.string,
  translate: PropTypes.string,
  sizeClass: PropTypes.string,
  fontSize: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  theme: PropTypes.string,
};

export default React.memo(Button);
