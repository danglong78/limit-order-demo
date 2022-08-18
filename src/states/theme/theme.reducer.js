import isClient from 'utils/isClient.util';
import { LOCAL_STORAGE_KEY } from 'constants/localStorage.constant';

import { ACTION } from './theme.action';

const initState = {
  isDark:
    false ||
    (isClient && localStorage.getItem(LOCAL_STORAGE_KEY.THEME) === 'dark'),
};

export const themeReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION.TOGGLE:
      return {
        isDark: payload.isDark,
      };
    default:
      return state;
  }
};
