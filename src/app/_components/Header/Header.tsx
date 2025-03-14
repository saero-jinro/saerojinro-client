import ThemeToggleButton from './ThemeToggleButton/ThemeToggleButton.client';
import getTheme from '@/_utils/Header/getTheme.server';
import HeaderNav from './HeaderNav/HeaderNav';
import Link from 'next/link';

const Header = async () => {
  const theme = await getTheme();

  return (
    <header className="fixed z-[1000] w-screen bg-[#171717] px-10 py-4">
      <nav className="w-[100%] h-full mx-auto px-4 flex justify-between z-[900] items-center text-[#F8F9FA]">
        <Link className="font-bold" href={'/'}>
          IT TIME
        </Link>
        <HeaderNav>
          <ThemeToggleButton theme={theme} />
        </HeaderNav>
      </nav>
    </header>
  );
};

export default Header;
