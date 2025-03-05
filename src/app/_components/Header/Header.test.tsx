import getTheme from '@/_utils/Header/getTheme.server';
import ThemeToggleButton from './ThemeToggleButton/ThemeToggleButton.client';

const Header = async () => {
  const theme = await getTheme();

  return (
    <header className="fixed z-[1000]">
      <nav className="w-screen h-[2rem] px-1 flex justify-between items-center border-solid border-b border-[#66666637] ">
        <ThemeToggleButton theme={theme} />
      </nav>
    </header>
  );
};

export default Header;
