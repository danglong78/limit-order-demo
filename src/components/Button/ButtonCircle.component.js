import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import twFocusClass from 'utils/twFocusClass.util';

// export interface ButtonCircleProps
//   extends ButtonHTMLAttributes<HTMLButtonElement> {
//   size?: string;
// }

const ButtonCircle = ({ className, size, label, theme, ...args }) => {
  const btnCircleClass = classNames(
    'button--circle',
    className,
    size,
    twFocusClass(true, theme)
  );
  return <button className={btnCircleClass} aria-label={label} {...args} />;
};

ButtonCircle.defaultProps = {
  className: '',
  size: 'w-9 h-9',
  theme: 'primary',
};

ButtonCircle.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  label: PropTypes.string.isRequired,
  theme: PropTypes.string,
};
export default ButtonCircle;
