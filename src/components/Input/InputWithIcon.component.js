import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import Input from './Input.component';

const InputWithIcon = ({
  className,
  inputClassName,
  iconStart: IconStart,
  iconEnd: IconEnd,
  componentStart: ComponentStart,
  componentEnd: ComponentEnd,
  register,
  ...args
}) => {
  return (
    <div className={classNames(className, 'relative')}>
      {(IconStart || ComponentStart) && (
        <div className="input-with-icon__icon-container-start">
          {IconStart && <IconStart className="input-with-icon__icon" />}
          {ComponentStart}
        </div>
      )}
      <Input
        className={classNames(inputClassName, 'pl-10')}
        {...register()}
        {...args}
      />
      {(IconEnd || ComponentEnd) && (
        <div className="input-with-icon__icon-container-end">
          {IconEnd && <IconStart className="input-with-icon__icon" />}
          {ComponentEnd}
        </div>
      )}
    </div>
  );
};

InputWithIcon.defaultProps = {
  className: '',
  inputClassName: '',
  iconStart: null,
  iconEnd: null,
  componentStart: null,
  componentEnd: null,
  register: () => ({}),
};

InputWithIcon.propTypes = {
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  iconStart: PropTypes.elementType,
  iconEnd: PropTypes.element,
  componentStart: PropTypes.elementType,
  componentEnd: PropTypes.element,
  register: PropTypes.func,
};

export default InputWithIcon;
