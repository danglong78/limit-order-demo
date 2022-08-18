import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from 'states/theme/theme.selector';
import { toggleTheme } from 'states/theme/theme.action';

const useTheme = () => {
  const dispatch = useDispatch();
  const isDark = useSelector(selectTheme);

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      toTheme('dark');
    } else {
      toTheme('light');
    }
  }, []);

  const toTheme = (theme) => {
    dispatch(toggleTheme(theme === 'dark'));
    const root = document.querySelector('html');
    if (root) {
      localStorage.theme = theme;
      theme === 'dark'
        ? root.classList.add('dark')
        : root.classList.remove('dark');
    }
  };
  return { isDark, toTheme };
};
export default useTheme;
