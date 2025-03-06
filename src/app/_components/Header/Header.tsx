import ThemeToggleButton from './ThemeToggleButton/ThemeToggleButton.client';
import getTheme from '@/_utils/Header/getTheme.server';
import HeaderNav from './HeaderNav/_HeaderNav';

const Header = async () => {
  const theme = await getTheme();

  return (
    <header className="fixed h-14 z-[1000]">
      <nav className="w-screen h-[2rem] px-4 flex justify-between z-[900] items-center border-solid border-b border-[#66666637] ">
        <ThemeToggleButton theme={theme} />
        <HeaderNav />
      </nav>
    </header>
  );
};

export default Header;
