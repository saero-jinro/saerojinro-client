import { Theme } from '@/_types/Header/Header.type';
/**
 * 프레젠테이션 로직
 */
const ThemeToggleView = ({ theme }: { theme: Theme }) => {
  return (
    <span className="select-none border-gray-500 dark:border-gray-300 rounded-lg">
      {theme === 'light' ? '🌙' : '☀️ '}
    </span>
  );
};

export default ThemeToggleView;
