import React from 'react';
import PropTypes from 'prop-types';

const BackgroundGlassmorphism = ({ className }) => {
  return (
    <div className={`background-glassmorphism ${className}`}>
      <span className="background-glassmorphism__red-circle" />
      <span className="background-glassmorphism__green-circle" />
    </div>
  );
};

BackgroundGlassmorphism.defaultProps = {
  className: '',
};

BackgroundGlassmorphism.propTypes = {
  className: PropTypes.string,
};

export default BackgroundGlassmorphism;
