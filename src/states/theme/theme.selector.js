import get from 'utils/get.util';

export const selectTheme = (state) => get(state, `theme.isDark`, false);
