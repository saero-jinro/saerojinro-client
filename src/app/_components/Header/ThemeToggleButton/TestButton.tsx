'use clinet';
const ToggleThemeButton = () => {
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');

    document.cookie = `theme=${isDark ? 'dark' : 'light'}; SameSite=Lax; Path=/;`;
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 bg-gray-200 dark:bg-gray-800 rounded-full `}
      aria-label="Toggle theme"
    >
      모드 변경
    </button>
  );
};
export default ToggleThemeButton;
