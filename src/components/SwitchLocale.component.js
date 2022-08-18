import React from 'react';
import PropTypes from 'prop-types';
import Image from 'components/Image.component';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import useDetectScreen from 'hooks/useDetectScreen';

const LOCALE_FLAG = {
  en: {
    src: '/images/united_kingdom_flag.svg',
    alt: 'Switch to English',
  },
  vi: {
    src: '/images/vietnam_flag.svg',
    alt: 'Switch to Vietnamese',
  },
};

const SwitchLocale = ({ className }) => {
  const router = useRouter();
  const { mobileScreen } = useDetectScreen();
  const { t } = useTranslation('common');

  const { locale: activeLocale } = router;
  const { pathname, query, asPath } = router;

  const localeToSwitch = activeLocale === 'en' ? 'vi' : 'en';
  const { src, alt } = LOCALE_FLAG[activeLocale];

  const renderButton = () => (
    <button
      className={`button--icon-raw relative ${className}`}
      onClick={() =>
        router.replace({ pathname, query }, asPath, {
          locale: localeToSwitch,
        })
      }
      aria-label={t('switchLanguage')}
    >
      <span className="sr-only">{t('switchLanguage')}</span>
      <Image src={src} alt={alt} layout="fixed" width={30} height={21} />
    </button>
  );

  if (mobileScreen) return renderButton();

  return (
    <div className="tooltip tooltip-bottom" data-tip={t('switchLanguage')}>
      {renderButton()}
    </div>
  );
};

SwitchLocale.defaultProps = {
  className: '',
};

SwitchLocale.propTypes = {
  className: PropTypes.string,
};

export default React.memo(SwitchLocale);
