import React from 'react';
import PropTypes from 'prop-types';
import useTheme from 'hooks/useTheme';

import { MoonIcon } from '@heroicons/react/solid';
import { SunIcon } from '@heroicons/react/outline';

import ButtonIconRaw from './Button/ButtonIconRaw.component';

const SwitchDarkMode = ({ className }) => {
  const { toTheme, isDark } = useTheme();

  const toggleDarkMode = () => {
    if (localStorage.theme === 'light') {
      toTheme('dark');
      return;
    }
    toTheme('light');
  };

  return (
    <ButtonIconRaw
      className={className}
      icon={isDark ? MoonIcon : SunIcon}
      onClick={toggleDarkMode}
      tooltip='Change theme'
      label='Change theme'
    />
  );
};

SwitchDarkMode.defaultProps = {
  className: '',
};

SwitchDarkMode.propTypes = {
  className: PropTypes.string,
};

export default React.memo(SwitchDarkMode);
