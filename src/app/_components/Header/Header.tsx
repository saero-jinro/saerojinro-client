import ThemeToggleButton from './ThemeToggleButton/ThemeToggleButton.client';
import getTheme from '@/_utils/Header/getTheme.server';
import HeaderNav from './HeaderNav/HeaderNav';

const Header = async () => {
  const theme = await getTheme();

  return (
    <header className="fixed z-[1000] w-screen border-solid border bg-white  border-[#66666637] dark:bg-black dark:border-[#666]">
      <nav className="w-[100%] max-w-[1920px] h-[2rem] mx-auto px-4 flex justify-between z-[900] items-center">
        <ThemeToggleButton theme={theme} />
        <HeaderNav />
      </nav>
    </header>
  );
};

export default Header;
