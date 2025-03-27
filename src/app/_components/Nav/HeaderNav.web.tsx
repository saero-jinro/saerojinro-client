'use client';

import AlarmButton from '@/_components/Header/Alarm/AlarmButton';
import { NavItem } from '@/_types/Header/Header.type';
import useAuthStore from '@/_store/auth/useAuth';
import { usePathname } from 'next/navigation';
import { useNav } from '@/_hooks/nav/useNav';
import { ReactNode } from 'react';
import Link from 'next/link';
import useLoginModalStore from '@/_store/modal/useLoginModalStore';
import ClickButton from '../ClickButton';

interface WebNavListProps {
  children?: ReactNode;
}

// 웹
const WebNavList = ({ children }: WebNavListProps) => {
  const role = useAuthStore((store) => store.state.role);
  const name = useAuthStore((store) => store.state.name);
  const nickName = role === 'admin' ? 'admin' : name || '';
  const pathname = usePathname();
  const { web } = useNav(role);

  const path = {
    admin: '/admin',
    user: '/mypage',
  };

  return (
    <div className="flex justify-center items-center gap-2 select-none text-lg">
      {children}
      <nav>
        <ol className="flex gap-2 items-center tracking-tighter">
          {/* 아이템 */}
          {web.map((props) => (
            <WebNavItem key={props.title} {...props} />
          ))}
          {!pathname?.startsWith('/admin') && role !== 'guest' && (
            <Link className="px-2 py-3" href={path[role]}>
              {nickName}
            </Link>
          )}
          {role === 'guest' && <LoginButton />}
        </ol>
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
    <ClickButton
      className="px-2 py-3 hover:brightness-90"
      actionDesc="open-login-modal"
      onClick={open}
    >
      로그인
    </ClickButton>
  );
};
