import ThemeToggleButton from './ThemeToggleButton/ThemeToggleButton.client';
import getTheme from '@/_utils/Header/getTheme.server';
import HeaderNav from './HeaderNav/HeaderNav';
import LoginModal from '../Login/LoginModal';
import Alarm from './Alarm/AlarmWindow';
import Link from 'next/link';
import Popup from '../Popup/Popup';

const Header = async () => {
  const theme = await getTheme();

  return (
    <>
      <header className="fixed z-[100] w-screen bg-[#171717]">
        <nav className="w-[100%] mx-auto h-[64px] md:h-[80px] px-4 md:px-10 md:py-4 flex justify-between items-center text-[#F8F9FA] relative">
          <Link className="font-bold text-xl" href={'/'}>
            <span>IT TIME</span>
          </Link>
          <HeaderNav>
            <ThemeToggleButton theme={theme} />
            <Alarm />
          </HeaderNav>
          <LoginModal />
        </nav>
        <Popup />
      </header>
    </>
  );
};

export default Header;
