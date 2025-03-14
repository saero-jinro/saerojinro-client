import { NavItem, NavSectionProps, UserRole } from '@/_types/Header/Header.type';
import Right from '@/assets/Header/right.svg';
import Link from 'next/link';
import { Nav } from '../nav';
import { useNav } from '@/_hooks/nav/useNav';

const MobileNavTop = ({ nickName }: { nickName: string }) => {
  return (
    <div className="flex items-end h-[28px] mb-2 gap-[0.5px]">
      <span className="text-[14px]">{nickName}</span>
    </div>
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
  return (
    <li key={title} className="py-[0.4rem] flex justify-between items-center cursor-pointer">
      <div className="flex items-center gap-2">
        <div className="w-[16px] h-[16px] bg-[#7373739a] rounded-[4px] flex justify-center items-center"></div>
        <span>
          <Link href={path}>{title}</Link>
        </span>
      </div>
      <Right width="20" height="20" />
    </li>
  );
};

// -------------네비게이션--------------

interface Props {
  role: UserRole;
  nickName: string;
}

export const MobileNavigation = ({ role, nickName }: Props) => {
  const { mobile } = useNav(role);

  return (
    <Nav
      navDto={mobile}
      renderTop={() => (role !== 'no-login' ? <MobileNavTop nickName={nickName} /> : <></>)}
      renderItem={(item) => <MobileNavItem key={item.title} {...item} />}
      renderSection={(section, renderItem) => (
        <MobileNavSection key={section.title} section={section} renderItem={renderItem} />
      )}
      className="fixed z-[1000] w-[75%] p-4 h-screen top-0 right-0 text-black dark:text-white bg-white dark:bg-black select-none"
    />
  );
};
