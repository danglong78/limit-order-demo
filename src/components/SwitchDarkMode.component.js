import React from 'react';
import PropTypes from 'prop-types';
import useTheme from 'hooks/useTheme';

import { MoonIcon } from '@heroicons/react/solid';
import { SunIcon } from '@heroicons/react/outline';

import { useTranslation } from 'next-i18next';
import ButtonIconRaw from './Button/ButtonIconRaw.component';

const SwitchDarkMode = ({ className }) => {
  const { toTheme, isDark } = useTheme();
  const { t } = useTranslation('common');

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
      tooltip={t('switchTheme')}
      label={t('switchTheme')}
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
