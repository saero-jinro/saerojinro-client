'use client';
import { NavItem, UserRole } from '@/_types/Header/Header.type';
import LoginComponent from '@/_components/Login/LoginComponent';
import Alarm from '@/_components/Header/Alarm/Alarm';
import { usePathname } from 'next/navigation';
import { useNav } from '@/_hooks/nav/useNav';
import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import ToggleModal from '@/_components/ToggleModal';
import ClickButton from '@/_components/ClickButton';

interface WebNavListProps {
  nickName: string;
  children?: ReactNode;
}

// 웹
const WebNavList = ({ nickName, children }: WebNavListProps) => {
  const [clientPathname, setClientPathname] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole>('no-login');
  const pathname = usePathname();

  // 액세스 토큰 유무 확인 (클라이언트에서만 실행)
  useEffect(() => {
    setClientPathname(pathname);
    if (typeof window !== 'undefined') {
      const cookies = document.cookie.split('; ');
      for (const cookie of cookies) {
        const [key] = cookie.split('=');
        if (key === 'id_token') {
          setRole(pathname === '/admin' ? 'admin' : 'viewer');
          return;
        }
      }
      setRole('no-login');
    }
  }, [pathname]);

  const { web } = useNav(role);

  return (
    <div className="flex justify-center items-center gap-2 select-none text-[18px]">
      <nav>
        <ol className="flex gap-2 items-center tracking-tighter">
          {children}
          {/* 아이템 */}
          {web.map((props) => (
            <WebNavItem key={props.title} {...props} />
          ))}
        </ol>
      </nav>

      {!clientPathname?.startsWith('/admin') && role !== 'no-login' && (
        <Link href="/mypage">{nickName}</Link>
      )}
      {!clientPathname?.startsWith('/admin') && role === 'no-login' && <LoginButton />}
      {!clientPathname?.startsWith('/admin') && role === 'viewer' && <Alarm />}
    </div>
  );
};

export default WebNavList;

const WebNavItem = ({ path, title }: NavItem) => {
  return (
    <li className="cursor-pointer px-2 py-3 text-nowrap" key={title}>
      <Link href={path}>{title}</Link>
    </li>
  );
};

const LoginButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  return (
    <>
      <div>
        <ClickButton actionDesc="open-login-modal" onClickAction={onOpen}>
          로그인
        </ClickButton>
        <ToggleModal desc="login-modal" isOpen={isOpen} onClose={onClose} hasOverlay={true}>
          <div className="relative">
            <div className="fixed z-[1000] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
              <div className="text-black dark:text-white bg-white dark:bg-black w-[768px] h-[720px] px-[83px] flex flex-col justify-center scale-80">
                <button
                  onClick={onClose}
                  className="text-2xl absolute top-[0.5rem] right-[1rem] cursor-pointer"
                >
                  x
                </button>
                <LoginComponent />
              </div>
            </div>
          </div>
        </ToggleModal>
      </div>
    </>
  );
};
