import React from 'react';
import Image from 'components/Image.component';
import Head from 'next/head';
import PropTypes from 'prop-types';

import { ButtonSecondary } from 'components/Button';
import classNames from 'classnames';

import Loading from 'images/loading.svg';
import BackgroundGlassmorphism from './BackgroundGlassmorphism.component';

const SinglePageButton = ({
  title,
  imgSrc,
  description,
  btnTitle,
  btnHref,
  btnClass,
  loading,
  hideBtn,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px-62px)] md:h-[calc(100vh-74px)] text-center px-4 !overflow-hidden">
        <BackgroundGlassmorphism className="!h-[calc(100%-64px-62px)] !p-0 !top-[62px] md:!top-[74px]" />
        <div
          className={classNames([
            'max-w-lg flex items-center px-6 md:px-0',
            loading && 'animate-bounce-slow',
          ])}
        >
          <Image src={loading ? Loading : imgSrc} alt={title} />
        </div>
        <span className="font-bold text-lg md:text-3xl mt-6">{title}</span>
        <span className="font-semibold text-neutral-400 text-sm md:text-base mt-3 mb-6">
          {description}
        </span>
        {!hideBtn && (
          <ButtonSecondary
            label={btnTitle}
            href={btnHref}
            className={btnClass}
            loading={loading}
          >
            {btnTitle}
          </ButtonSecondary>
        )}
      </div>
    </>
  );
};

SinglePageButton.defaultProps = {
  title: '',
  imgSrc: '',
  description: '',
  btnTitle: '',
  btnHref: '/',
  btnClass: '',
  loading: false,
  hideBtn: false,
};

SinglePageButton.propTypes = {
  title: PropTypes.string,
  imgSrc: PropTypes.any,
  description: PropTypes.string,
  btnTitle: PropTypes.string,
  btnHref: PropTypes.string,
  btnClass: PropTypes.string,
  loading: PropTypes.bool,
  hideBtn: PropTypes.bool,
};

export default SinglePageButton;
