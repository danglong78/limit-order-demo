import React from 'react';

const ClearDataButton = ({ onClick }) => {
  return (
    <span onClick={() => onClick && onClick()} className="button--clear">
      <i className="las la-times" />
    </span>
  );
};

export default ClearDataButton;
