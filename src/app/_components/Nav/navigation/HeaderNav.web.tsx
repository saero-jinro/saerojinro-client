import { NavItem, UserRole } from '@/_types/Header/Header.type';
import Alarm from '@/_components/Header/Alarm/Alarm';
import { usePathname } from 'next/navigation';
import { useNav } from '@/_hooks/nav/useNav';
import { ReactNode } from 'react';
import Link from 'next/link';

interface WebNavListProps {
  role: UserRole;
  nickName: string;
  children?: ReactNode;
}

// 웹
export const WebNavList = ({ role, nickName, children }: WebNavListProps) => {
  const pathname = usePathname();
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

      {!pathname.startsWith('/admin') && role !== 'no-login' && <span>{nickName}</span>}
      {!pathname.startsWith('/admin') && role === 'viewer' && <Alarm />}
    </div>
  );
};

const WebNavItem = ({ path, title }: NavItem) => {
  return (
    <li className="cursor-pointer px-2 py-3 text-nowrap" key={title}>
      <Link href={path}>{title}</Link>
    </li>
  );
};