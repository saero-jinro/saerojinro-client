import ThemeToggleButton from './ThemeToggleButton/ThemeToggleButton.client';
import getTheme from '@/_utils/Header/getTheme.server';
import HeaderNav from './HeaderNav/HeaderNav';
import LoginModal from '../Login/LoginModal';
import Alarm from './Alarm/AlarmWindow';
import Link from 'next/link';
import Popup from '../Popup/Popup';
import AdminTitle from './adminTitle';

const Header = async () => {
  const theme = await getTheme();

  return (
    <>
      <header className="fixed z-[100] w-screen bg-[#171717] dark:bg-[#0F172B]">
        <nav className="w-[100%] mx-auto h-[64px] md:h-[80px] px-4 md:px-10 md:py-4 flex justify-between items-center text-[#F8F9FA] relative">
          <Link className="font-bold text-xl" href={'/'}>
            <span className="mr-3">IT TIME</span>
            <AdminTitle />
          </Link>
          <HeaderNav>
            <ThemeToggleButton theme={theme} />
          </HeaderNav>
        </nav>
        <LoginModal />
        <Alarm />
        <Popup />
      </header>
    </>
  );
};

export default Header;
