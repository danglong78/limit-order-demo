import React from 'react';
import PropTypes from 'prop-types';

import Loading from 'components/Loading.component';
import useDetectScreen from 'hooks/useDetectScreen';

const ButtonIconRaw = ({
  className,
  iconClassName,
  icon: Icon,
  tooltip,
  onClick,
  label,
  loading,
  disabled,
  tooltipClassName,
}) => {
  const { mobileScreen } = useDetectScreen();

  const renderButton = () => (
    <button
      onClick={onClick}
      className={`button--icon-raw ${className}`}
      aria-label={label}
      disabled={loading || disabled}
    >
      <span className="sr-only">{tooltip || label}</span>
      {loading ? (
        <Loading />
      ) : (
        <Icon className={`w-7 h-7 ${iconClassName}`} aria-hidden="true" />
      )}
    </button>
  );

  if (tooltip && !mobileScreen)
    return (
      <div className={`tooltip ${tooltipClassName}`} data-tip={tooltip}>
        {renderButton()}
      </div>
    );

  return renderButton();
};

ButtonIconRaw.defaultProps = {
  className: '',
  iconClassName: '',
  tooltip: '',
  onClick: () => {},
  loading: false,
  disabled: false,
  tooltipClassName: 'tooltip-bottom',
};

ButtonIconRaw.propTypes = {
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  tooltip: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  tooltipClassName: PropTypes.string,
};

export default ButtonIconRaw;
