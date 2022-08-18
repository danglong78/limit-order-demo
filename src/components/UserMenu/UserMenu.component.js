/* eslint-disable no-console */
import React, { Fragment, useEffect, memo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

import useWalletConnect from 'hooks/useWalletConnect';

import { Popover, Transition } from '@headlessui/react';
import ConnectWalletButton from 'components/ConnectWalletButton.component';
import { LogoutIcon } from '@heroicons/react/outline';

import UserLabel from './UserLabel.component';
import MenuItem from './MenuItem.component';

const UserMenu = () => {
  const { account } = useWeb3React();
  const { disconnect } = useWalletConnect();
  const [show, setShow] = useState(false);

  const solutionsFoot = [
    {
      name: 'disconnect',
      iconItem: LogoutIcon,
      onClick: disconnect,
    },
  ];

  useEffect(async () => {
    if (!account) {
      disconnect();
    }
  }, [account]);

  if (!account) {
    return <ConnectWalletButton />;
  }

  return (
    <div>
      <Popover
        className="relative"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {() => (
          <>
            <Popover.Button
              className="user-menu-popover__button"
              aria-label="User menu"
            >
              <UserLabel account={account} />
            </Popover.Button>
            <Transition
              as={Fragment}
              show={show}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel static className="menu-popover__panel">
                <div className="user-menu__content">
                  {solutionsFoot.map((item, index) => (
                    <MenuItem key={index} {...item} />
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default memo(UserMenu);
