import React from 'react';
import PropTypes from 'prop-types';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { CreditCardIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

const UserLabel = ({ account, viewMode }) => {
  const accountEllipsisSubLengthStart = viewMode ? 14 : 2;
  const accountEllipsisSubLengthEnd = viewMode ? 10 : 4;

  const accountEllipsis = account
    ? `${account.substring(
        0,
        accountEllipsisSubLengthStart
      )}...${account.substring(account.length - accountEllipsisSubLengthEnd)}`
    : null;

  return (
    <div className="user-label">
      <div
        className={classNames([
          'user-label__content',
          viewMode && 'user-label__content-view-mode',
        ])}
      >
        <div className="user-label__icon-wrapper">
          <CreditCardIcon className="w-6 h-6" />
        </div>
        <div className="user-label__label">{accountEllipsis}</div>
        {!viewMode && <ChevronDownIcon className="w-4 h-4 text-neutral-700" />}
      </div>
    </div>
  );
};

UserLabel.defaultProps = {
  viewMode: false,
};

UserLabel.propTypes = {
  account: PropTypes.string.isRequired,
  viewMode: PropTypes.bool,
};

export default UserLabel;
