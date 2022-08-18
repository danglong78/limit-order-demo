export const ACTION = {
  TOGGLE: 'theme.TOGGLE',
};

export const toggleTheme = (isDark) => (dispatch) =>
  dispatch({
    type: ACTION.TOGGLE,
    payload: {
      isDark,
    },
  });
