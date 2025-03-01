import ToggleThemeButton from './ThemeToggleButton/TestButton';

const Header = () => {
  return (
    <header className="fixed z-[1000]">
      <nav className="w-screen h-[2rem] px-1 flex justify-between items-center border-solid border-b border-[#66666637] ">
        <ToggleThemeButton />
      </nav>
    </header>
  );
};

export default Header;
