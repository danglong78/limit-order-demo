import React from 'react';
import classNames from 'classnames';

import useTheme from 'hooks/useTheme';

const ButtonSubmit = ({ children }) => {
  const { isDark } = useTheme();
  return (
    <button type="button" className="button--submit">
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={classNames('h-6 w-6', isDark && 'text-black')}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
  );
};

export default ButtonSubmit;
