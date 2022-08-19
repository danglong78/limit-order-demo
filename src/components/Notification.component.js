import React from 'react';
import { toast, Toaster, ToastBar } from 'react-hot-toast';
import { XIcon } from '@heroicons/react/outline';

import useDetectScreen from 'hooks/useDetectScreen';

const Notification = () => {
  const { mobileScreen } = useDetectScreen();

  const position = mobileScreen ? 'top-center' : 'bottom-right';

  const toastOptions = {
    className: 'notification__toaster',
  };

  return (
    <Toaster
      position={position}
      toastOptions={toastOptions}
      reverseOrder={false}
    >
      {(t) => (
        <ToastBar toast={t} position={position}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== 'loading' && (
                <XIcon
                  className="notification__x-icon"
                  onClick={() => toast.dismiss(t.id)}
                />
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

export default Notification;
