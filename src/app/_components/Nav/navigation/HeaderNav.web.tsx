'use client';

import LoginComponent from '@/_components/Login/LoginComponent';
import { HeaderRoleState, useNav } from '@/_hooks/nav/useNav';
import { NavItem } from '@/_types/Header/Header.type';
import Alarm from '@/_components/Header/Alarm/Alarm';
import { ReactNode, useState } from 'react';
import Link from 'next/link';
import ToggleModal from '@/_components/ToggleModal';
import ClickButton from '@/_components/ClickButton';

interface WebNavListProps extends HeaderRoleState {
  children?: ReactNode;
  nickName?: string;
}

// 웹
const WebNavList = ({ children, role, pathname, nickName }: WebNavListProps) => {
  const { web } = useNav(role);

  const path = {
    admin: '/admin',
    viewer: '/mypage',
  };
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

      {!pathname?.startsWith('/admin') && role !== 'no-login' && (
        <Link href={path[role]}>{nickName}</Link>
      )}
      {role === 'no-login' && <LoginButton />}
      {role === 'viewer' && <Alarm />}
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
                <LoginComponent onClose={onClose} />
              </div>
            </div>
          </div>
        </ToggleModal>
      </div>
    </>
  );
};
