import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const MenuItem = ({ href, name, iconItem, onClick }) => {
  const { t } = useTranslation('common');

  if (href)
    return (
      <Link href={href} passHref>
        <a className="user-menu-item__wrapper">
          <div className="user-menu-item__icon-wrapper">
            {React.createElement(iconItem, {
              'aria-hidden': true,
              className: 'w-6 h-6',
            })}
          </div>
          <div className="ml-4">
            <p className="user-menu-item__text">{t(name)}</p>
          </div>
        </a>
      </Link>
    );

  return (
    <div className="user-menu-item__wrapper" onClick={onClick}>
      <div className="user-menu-item__icon-wrapper">
        {React.createElement(iconItem, {
          'aria-hidden': true,
          className: 'w-6 h-6',
        })}
      </div>
      <div className="ml-4">
        <p className="user-menu-item__text">{t(name)}</p>
      </div>
    </div>
  );
};

MenuItem.defaultProps = {
  onClick: () => {},
  href: '',
};

MenuItem.propTypes = {
  href: PropTypes.string,
  name: PropTypes.string.isRequired,
  iconItem: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};
export default MenuItem;
