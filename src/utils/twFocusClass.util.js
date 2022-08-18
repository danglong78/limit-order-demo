export default function twFocusClass(hasRing = false, theme) {
  if (!hasRing) {
    return 'focus:outline-none';
  }
  return `${getTheme(
    theme
  )} focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 focus:ring-opacity-50`;
}

const getTheme = (theme) => {
  switch (theme) {
    case 'primary':
      return 'focus:ring-primary-500';
    case 'secondary':
      return 'focus:ring-secondary-400';
    case 'third':
      return 'focus:ring-neutral-700 dark:focus:ring-neutral-500';
    case 'fourth':
      return 'focus:ring-primary-200 dark:ring-primary-500 dark:focus:ring-opacity-25';
    default:
      return 'focus:ring-neutral-700 dark:focus:ring-neutral-500';
  }
};
