import { NavItem, NavSectionProps } from '@/_types/Header/Header.type';
import { useNav } from '@/_hooks/nav/useNav';
import useHeaderStore from '@/_store/Header/useHeaderStore';
import Right from '@/assets/Header/right.svg';
import Link from 'next/link';
import { Nav } from '../nav';
import { UserRole } from '@/_types/Auth/auth.type';
import useAuthStore from '@/_store/auth/useAuth';

const MobileNavTop = ({ nickName, path }: { nickName: string; path: string }) => {
  const onClose = useHeaderStore((store) => store.mobileNavOpen.actions.setClose);
  return (
    <Link href={path} onClick={onClose} className="flex items-end h-[28px] mb-2 gap-[0.5px]">
      <span className="text-[14px]">{nickName}</span>
    </Link>
  );
};

const MobileNavSection = ({ section, renderItem }: NavSectionProps) => {
  return (
    <div className="py-2">
      <div className="font-bold text-base mb-[4px]">{section.title}</div>
      <ul className="font-light text-sm py-0.5 flex flex-col">
        {section.items.map((item) => renderItem(item))}
      </ul>
    </div>
  );
};

const MobileNavItem = ({ path, title }: NavItem) => {
  const onCloseModal = useHeaderStore((state) => state.mobileNavOpen.actions.setClose);
  return (
    <li key={title} className="py-[0.4rem] flex justify-between items-center cursor-pointer">
      <div className="flex items-center gap-2">
        <div className="w-[16px] h-[16px] bg-[#7373739a] rounded-[4px] flex justify-center items-center"></div>
        <span>
          <Link onClick={onCloseModal} href={path}>
            {title}
          </Link>
        </span>
      </div>
      <Right width="20" height="20" />
    </li>
  );
};

// -------------네비게이션--------------

interface Props {
  nickName: string;
}

export const MobileNavigation = ({ nickName }: Props) => {
  const role = useAuthStore((store) => store.state.role);
  const { mobile } = useNav(role);

  const path: Record<UserRole, string> = {
    admin: '/admin',
    user: '/mypage',
    guest: '/login',
  };

  return (
    <Nav
      navDto={mobile}
      renderTop={() => <MobileNavTop nickName={nickName} path={path[role]} />}
      renderItem={(item) => <MobileNavItem key={item.title} {...item} />}
      renderSection={(section, renderItem) => (
        <MobileNavSection key={section.title} section={section} renderItem={renderItem} />
      )}
      className="fixed z-[1000] w-[75%] p-4 h-screen top-0 right-0 text-black dark:text-white bg-white dark:bg-black select-none"
    />
  );
};
