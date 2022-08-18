import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import NextImage from 'next/image';
import PlaceholderDark from 'images/placeholder-large-dark-h.png';
import Placeholder from 'images/placeholder-large-h.png';
import useTheme from 'hooks/useTheme';
import classNames from 'classnames';

const Image = ({ alt, src, className, ...args }) => {
  const [completeLoading, setCompleteLoading] = useState(false);
  const { isDark } = useTheme();
  const [source, setSource] = useState(src || placeholder);

  useEffect(() => {
    if (src) setSource(src);
  }, [src]);

  const placeholder = isDark ? PlaceholderDark : Placeholder;

  return (
    <NextImage
      className={classNames(className, 'duration-700 ease-in-out', {
        'grayscale blur-2xl scale-110': !completeLoading,
        'grayscale-0 blur-0 scale-100': completeLoading,
      })}
      src={source}
      alt={alt}
      onError={() => setSource(placeholder)}
      onLoadingComplete={() => setCompleteLoading(true)}
      {...args}
    />
  );
};

Image.defaultProps = {
  alt: 'nc-imgs',
  src: '',
  className: 'object-cover w-full h-full',
  layout: 'intrinsic',
};

Image.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  layout: PropTypes.string,
};

export default Image;
