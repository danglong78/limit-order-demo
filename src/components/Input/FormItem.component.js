import React from 'react';
import PropTypes from 'prop-types';

import Label from 'components/Input/Label.component';
import classNames from 'classnames';

const FormItem = ({
  children,
  className,
  labelClassName,
  label,
  desc,
  error,
}) => {
  return (
    <div className={`${className} flex flex-col`}>
      {label && <Label className={`${labelClassName} mb-1`}>{label}</Label>}
      {children}
      {desc && (
        <span
          className={classNames(
            'block mt-3 text-xs text-neutral-500 dark:text-neutral-400 ',
            {
              '!text-rose-600 dark:!text-rose-500': error,
            }
          )}
        >
          {desc}
        </span>
      )}
    </div>
  );
};

FormItem.defaultProps = {
  className: '',
  labelClassName: '',
  children: undefined,
  label: null,
  desc: null,
  error: false,
};

FormItem.propTypes = {
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  children: PropTypes.node,
  label: PropTypes.string,
  desc: PropTypes.string,
  error: PropTypes.bool,
};

export default FormItem;
