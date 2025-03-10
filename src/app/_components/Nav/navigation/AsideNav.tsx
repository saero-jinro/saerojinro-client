'use client';
import { NavItem, NavSectionProps } from '@/_types/Header/Header.type';
import { useNav } from '@/_hooks/useNav/useNav';
import Right from '@/assets/Header/right.svg';
import Link from 'next/link';
import { Nav } from '../nav';

const AsideNavSection = ({ section, renderItem }: NavSectionProps) => {
  return (
    <div className="py-2 px-4">
      <div className="font-bold text-base mb-[4px]">{section.title}</div>
      <ul className="font-light text-sm py-0.5 flex flex-col">
        {section.items.map((item) => renderItem(item))}
      </ul>
    </div>
  );
};

const AsideNavItem = ({ path, title }: NavItem) => {
  return (
    <li key={title} className="py-[0.4rem] flex justify-between items-center cursor-pointer">
      <div className="flex items-center gap-2">
        {/* <div className="w-[16px] h-[16px] bg-[#7373739a] rounded-[4px] flex justify-center items-center"></div> */}
        <span>
          <Link href={path}>{title}</Link>
        </span>
      </div>
      <Right width="20" height="20" />
    </li>
  );
};

// -------------네비게이션--------------

export const MyPageAsideNavigation = () => {
  const { mobile } = useNav('viewer');
  return (
    <aside className="w-[160px] h-screen">
      <div className="h-[2rem]" />
      <Nav
        navDto={mobile}
        renderItem={(item) => <AsideNavItem key={item.title} {...item} />}
        renderSection={(section, renderItem) => (
          <AsideNavSection key={section.title} section={section} renderItem={renderItem} />
        )}
        className="pt-[4px] h-full border-r border-solid border-[#66666637] dark:border-[#666]"
      />
    </aside>
  );
};

export const AdminAsideNavigation = () => {
  const { mobile } = useNav('admin');
  return (
    <aside className="w-[160px] h-screen">
      <div className="h-[2rem]" />
      <Nav
        navDto={mobile}
        renderItem={(item) => <AsideNavItem key={item.title} {...item} />}
        renderSection={(section, renderItem) => (
          <AsideNavSection key={section.title} section={section} renderItem={renderItem} />
        )}
        className="pt-[4px] h-full border-r border-solid border-[#66666637] dark:border-[#666]"
      />
    </aside>
  );
};
