import { cookies } from 'next/headers';
import { Theme } from '@/_type/Header/theme';
import ThemeToggleButton from './ThemeToggleButton/ThemeToggleButton.client';

const Header = async () => {
  const cookieStore = await cookies();
  const theme = (cookieStore.get('theme')?.value as Theme) ?? 'light';

  return (
    <header className="fixed z-[1000]">
      <nav className="w-screen h-[2rem] px-1 flex justify-between items-center border-solid border-b border-[#66666637] ">
        <ThemeToggleButton theme={theme} />
      </nav>
    </header>
  );
};

export default Header;
