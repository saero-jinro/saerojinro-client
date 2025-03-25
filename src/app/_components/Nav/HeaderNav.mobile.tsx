import AlarmButton from '@/_components/Header/Alarm/AlarmButton';
import { NavItem } from '@/_types/Header/Header.type';
import { usePathname } from 'next/navigation';
import { useNav } from '@/_hooks/nav/useNav';
import useHeaderStore from '@/_store/Header/useHeaderStore';
import useAuthStore from '@/_store/auth/useAuth';
import Link from 'next/link';

export const MobileNavigation = () => {
  const onClose = useHeaderStore((store) => store.mobileNavOpen.actions.setClose);
  const role = useAuthStore((store) => store.state.role);
  const name = useAuthStore((store) => store.state.name);
  const pathname = usePathname();
  const { web } = useNav(role);

  const goLoginPage = () => {
    sessionStorage.setItem('prevUrl', pathname);
    onClose();
  };

  const renderTopSection = () => {
    if (role === 'guest') {
      return (
        <Link onClick={goLoginPage} href="/login">
          로그인
        </Link>
      );
    }

    if (role === 'admin') {
      return <Link href="/admin">admin</Link>;
    }

    return <AlarmButton scale={24} />;
  };

  return (
    <nav className="w-[215px] h-screen fixed right-0 bg-white text-black top-0 z-[100]">
      {/* TOP */}
      <div className="pt-8 px-6 flex items-center justify-end">{renderTopSection()}</div>

      {/* LIST */}
      <ul className="px-4 mt-6">
        {web.map((item) => (
          <MobileNavigationItem
            {...item}
            key={item.path}
            onClose={onClose}
            thisPath={item.path === pathname}
          />
        ))}

        {role === 'user' && (
          <MobileNavigationItem
            path="/mypage"
            title={name!}
            onClose={onClose}
            thisPath={pathname === '/mypage'}
          />
        )}
      </ul>
    </nav>
  );
};

interface ItemProps extends NavItem {
  thisPath: boolean;
  onClose: () => void;
}
// ITEM
const MobileNavigationItem = ({ path, title, thisPath, onClose }: ItemProps) => {
  return (
    <li style={{ color: thisPath ? '#015AFF' : 'black' }} className="px-2 py-4 font-semibold">
      <Link onClick={onClose} href={`${path}`}>
        {title}
      </Link>
    </li>
  );
};
