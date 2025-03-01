import { Theme } from '@/_type/theme';
/**
 * view compo
 */
const ThemeToggleView = ({ theme }: { theme: Theme }) => {
  return (
    <span className="border-gray-500 dark:border-gray-300 rounded-lg">
      {theme === 'light' ? '🌙' : '☀️ '}
    </span>
  );
};

export default ThemeToggleView;
