import React from 'react';
import PropTypes from 'prop-types';
import Image from 'components/Image.component';

const RoundImage = ({ sizeClass, imgUrl, userName, hasChecked }) => {
  return (
    <div className={`image-wrapper--round ${sizeClass}`}>
      {imgUrl && (
        <Image
          className="image--round"
          src={imgUrl}
          alt={userName}
          layout="fill"
        />
      )}
      {hasChecked && (
        <span className="avatar__check-icon ">
          <i className="las la-check" />
        </span>
      )}
    </div>
  );
};

RoundImage.defaultProps = {
  sizeClass: 'h-6 w-6 text-sm',
  imgUrl: '/icon-192x192.png',
  userName: 'Unnamed User',
  hasChecked: false,
};

RoundImage.propTypes = {
  sizeClass: PropTypes.string,
  imgUrl: PropTypes.string,
  userName: PropTypes.string,
  hasChecked: PropTypes.bool,
};

export default RoundImage;
