import ThemeIcon from '@/assets/Header/theme.svg';
/**
 * 프레젠테이션 로직
 */
const ThemeToggleView = () => {
  return (
    <span className="select-none border-gray-500 dark:border-gray-300 rounded-lg">
      <ThemeIcon />
    </span>
  );
};

export default ThemeToggleView;
