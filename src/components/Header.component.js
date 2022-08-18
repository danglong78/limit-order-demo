import React, { useEffect, useState, useRef } from 'react';
import throttle from 'lodash/throttle';
import classNames from 'classnames';
import useDetectScreen from 'hooks/useDetectScreen';
import Logo from 'components/Logo.component';
import SwitchDarkMode from 'components/SwitchDarkMode.component';
import UserMenu from 'components/UserMenu';
import UserWallet from 'components/UserMenu/UserWallet.component';
import SwitchLocale from './SwitchLocale.component';

const Header = () => {
  const [isTop, setisTop] = useState(true);
  const { mobileScreen, laptopScreen } = useDetectScreen();
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(
    typeof window === 'undefined'
      ? 0
      : document.getElementById('app-loading-wrapper') &&
          document.getElementById('app-loading-wrapper').scrollTop
  );
  const totalTopMenuHeight = laptopScreen ? '72px' : '64px';

  useEffect(() => {
    const $appLoading = document.getElementById('app-loading-wrapper');

    const scrollFunction = () => {
      const currentOffset = $appLoading.scrollTop;
      const isTopOfPage = currentOffset === 0;
      const isBottomOfPage =
        $appLoading.clientHeight === currentOffset + window.innerHeight;

      if (isTopOfPage) {
        setisTop(true);
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        setisTop(false);
        if (
          currentOffset < refPrevOffset.current ||
          currentOffset <= totalTopMenuHeight
        ) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      } else setisTop(false);
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(scrollFunction, 200);

    $appLoading.addEventListener('scroll', throttledHandleScroll);
    return () => {
      $appLoading.removeEventListener('scroll', throttledHandleScroll);
    };
  }, []);

  return (
    <div
      id="realnextate-header"
      className={classNames('header', { 'header--hide': !showMenu })}
    >
      <div
        className={classNames('header__main-nav', {
          'header__main-nav--not-on-top backdrop-filter': !isTop,
        })}
      >
        <div className="header__wrapper">
          <div className="header__left-inner" />
          <div className="header__right-inner">
            <div className="header__right-inner-content">
              {laptopScreen && <SwitchDarkMode />}
              {laptopScreen && <SwitchLocale />}
              {laptopScreen && <UserMenu />}
              {mobileScreen && <UserWallet />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
