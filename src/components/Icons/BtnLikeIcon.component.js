import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BtnLikeIcon = ({
  className = '',
  colorClass = 'text-white bg-black bg-opacity-30 hover:bg-opacity-50',
  isLiked = false,
}) => {
  const [likedState, setLikedState] = useState(isLiked);

  return (
    <div
      className={`nc-BtnLikeIcon w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
        likedState ? 'nc-BtnLikeIcon--liked' : ''
      }  ${colorClass} ${className}`}
      data-nc-id="BtnLikeIcon"
      title="Save"
      onClick={() => setLikedState(!likedState)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill={likedState ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </div>
  );
};

BtnLikeIcon.defaultProps = {
  className: '',
  colorClass: 'text-white bg-black bg-opacity-30 hover:bg-opacity-50',
  isLiked: false,
};

BtnLikeIcon.propTypes = {
  className: PropTypes.string,
  colorClass: PropTypes.string,
  isLiked: PropTypes.bool,
};

export default BtnLikeIcon;
