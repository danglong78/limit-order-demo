import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Image from 'components/Image.component';
import Building from 'images/building.svg';

const NotFoundAlert = ({ src, title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px-62px)] md:h-[calc(100vh-74px)] text-center px-4">
      <div className={classNames(['max-w-lg flex items-center px-6 md:px-0'])}>
        <Image src={src} alt="Not found" />
      </div>
      <span className="font-bold text-lg md:text-3xl mt-6">{title}</span>
      <span className="font-semibold text-neutral-400 text-sm md:text-base mt-3 mb-6">
        {description}
      </span>
    </div>
  );
};

NotFoundAlert.defaultProps = {
  title: '',
  description: '',
  src: Building,
};

NotFoundAlert.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default NotFoundAlert;
