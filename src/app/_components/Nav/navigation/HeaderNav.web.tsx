import { NavItem } from '@/_types/Header/Header.type';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface WebNavListProps {
  web: NavItem[];
}

// 웹
export const WebNavList = ({ web }: WebNavListProps) => {
  const pathname = usePathname();

  // 어드민 페이지에서는 네비게이션 숨김
  if (pathname.startsWith('/admin')) {
    return (
      <div className="flex justify-center items-center gap-2 text-sm select-none">
        <span className="text-sm font-medium">Admin</span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center gap-2 text-sm select-none">
      <nav>
        <ol className="flex gap-2 items-center tracking-tighter">
          {/* 네비게이션 아이템 표시 */}
          {web.map((props) => (
            <WebNavItem key={props.title} {...props} />
          ))}
        </ol>
      </nav>

      <span className="text-sm font-medium">김철수님</span>
    </div>
  );
};

const WebNavItem = ({ path, title }: NavItem) => {
  return (
    <li className="cursor-pointer" key={title}>
      <Link href={path}>{title}</Link>
    </li>
  );
};
