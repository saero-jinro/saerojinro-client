'use client';

import useLoginModalStore from '@/_store/modal/useLoginModalStore';
import AlarmButton from '@/_components/Alarm/AlarmButton';
import useAuthStore from '@/_store/auth/useAuth';
import ClickButton from '../ClickButton';
import { NavItem } from '@/_types/Header/Header.type';
import { useNav } from '@/_hooks/nav/useNav';
import { ReactNode } from 'react';
import Link from 'next/link';

interface WebNavListProps {
  children?: ReactNode;
}

// 웹
const WebNavList = ({ children }: WebNavListProps) => {
  const role = useAuthStore((store) => store.state.role);
  const name = useAuthStore((store) => store.state.name);
  const { web } = useNav(role);

  const path = {
    admin: '/mypage',
    user: '/mypage',
  };

  return (
    <div className="flex justify-center items-center gap-2 select-none text-lg">
      {children}
      <nav>
        <ul className="flex gap-2 items-center tracking-tighter">
          {/* 아이템 */}
          {web.map((props) => (
            <WebNavItem key={props.title} {...props} />
          ))}
          {role !== 'guest' && (
            <li>
              <Link className="px-2 py-3 hover:brightness-90" href={path[role]}>
                {name}
              </Link>
            </li>
          )}
          {role === 'guest' && <LoginButton />}
        </ul>
      </nav>
      {role === 'user' && <AlarmButton scale={32} />}
    </div>
  );
};

export default WebNavList;

// 아이템
const WebNavItem = ({ path, title }: NavItem) => {
  return (
    <li className="cursor-pointer px-2 py-3 text-lg text-nowrap hover:brightness-90" key={title}>
      <Link href={path}>{title}</Link>
    </li>
  );
};

const LoginButton = () => {
  const { open } = useLoginModalStore();
  return (
    <li>
      <ClickButton
        className="px-2 py-3 hover:brightness-90"
        actionDesc="open-login-modal"
        onClick={open}
      >
        로그인
      </ClickButton>
    </li>
  );
};
