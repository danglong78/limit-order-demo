import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useDetectScreen from 'hooks/useDetectScreen';

import Link from 'next/link';
import Image from 'components/Image.component';
import AppLogoLabel from 'images/LogoWithLabel.svg';
import AppLogoLabelLight from 'images/LogoWithLabelLight.svg';
import AppLogo from 'images/logo.svg';

const Logo = ({ img, imgLight, className, forceUseLogoFull }) => {
  const { mobileScreen } = useDetectScreen();

  const renderMiniLogo = () => (
    <Image src={AppLogo} alt="Logo Mobile" height={40} width={40} priority />
  );

  const renderFullLogo = () => (
    <>
      {img && (
        <div
          className={classNames(`block relative max-h-12`, {
            'dark:hidden': imgLight,
          })}
        >
          <Image
            className="object-contain"
            src={img}
            alt="Logo"
            height={48}
            width={164}
            priority
          />
        </div>
      )}
      {imgLight && (
        <div className="relative hidden m-0 max-h-12 dark:block">
          <Image
            className="object-contain"
            src={imgLight}
            alt="Logo Light"
            height={48}
            width={164}
            priority
          />
        </div>
      )}
    </>
  );

  const LogoToUse = () => {
    if (forceUseLogoFull) return renderFullLogo();

    if (mobileScreen) return renderMiniLogo();
    return renderFullLogo();
  };

  return (
    <Link href="/" passHref shallow>
      <a className={classNames('logo', className)}>
        <LogoToUse />
      </a>
    </Link>
  );
};

Logo.defaultProps = {
  img: AppLogoLabel,
  imgLight: AppLogoLabelLight,
  className: '',
  forceUseLogoFull: false,
};

Logo.propTypes = {
  img: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  imgLight: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  forceUseLogoFull: PropTypes.bool,
};

export default React.memo(Logo);
