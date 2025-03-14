import { NavItem } from '@/_types/Header/Header.type';
import Alarm from '@/_components/Header/Alarm/Alarm';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ReactNode } from 'react';

interface WebNavListProps {
  web: NavItem[];
  children?: ReactNode;
}

// 웹
export const WebNavList = ({ web, children }: WebNavListProps) => {
  const pathname = usePathname();

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
      {!pathname.startsWith('/admin') && <span>김철수님</span>}
      <Alarm />
    </div>
  );
};

const WebNavItem = ({ path, title }: NavItem) => {
  return (
    <li className="cursor-pointer px-2 py-3" key={title}>
      <Link href={path}>{title}</Link>
    </li>
  );
};
