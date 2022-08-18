import React, { useEffect, useState } from 'react';
import { ChevronUpIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { ButtonCircle } from './Button';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.querySelector('#app-loading-wrapper').scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    document.querySelector('#app-loading-wrapper').scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    document
      .querySelector('#app-loading-wrapper')
      .addEventListener('scroll', toggleVisible);
  }, []);

  return (
    <ButtonCircle
      className={classNames(
        '!fixed bottom-[62px] right-2 sm:bottom-[86px] md:bottom-4 sm:right-4 transition-all shadow-lg button--primary',
        {
          '!hidden': !visible,
        }
      )}
      onClick={scrollToTop}
      label="Scroll to top"
      theme="primary"
    >
      <ChevronUpIcon className="h-6 w-6" />
    </ButtonCircle>
  );
};

ScrollToTop.defaultProps = {};

ScrollToTop.propTypes = {};

export default ScrollToTop;
