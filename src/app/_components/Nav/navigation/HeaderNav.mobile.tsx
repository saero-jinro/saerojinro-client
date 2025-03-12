import { NavGroup, NavItem, NavSectionProps } from '@/_types/Header/Header.type';
import Right from '@/assets/Header/right.svg';
import Link from 'next/link';
import { Nav } from '../nav';

const MobileNavTop = () => {
  return (
    <div className="flex items-end h-[28px] mb-2 gap-[0.5px]">
      <span className="text-[14px]">김기준님</span>
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
  navDtos: NavGroup[];
}

export const MobileNavigation = ({ navDtos }: Props) => {
  return (
    <Nav
      navDto={navDtos}
      renderTop={() => <MobileNavTop />}
      renderItem={(item) => <MobileNavItem key={item.title} {...item} />}
      renderSection={(section, renderItem) => (
        <MobileNavSection key={section.title} section={section} renderItem={renderItem} />
      )}
      className="fixed z-[1000] w-[75%] p-4 h-screen top-0 right-0 bg-white dark:bg-black select-none"
    />
  );
};
