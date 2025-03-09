import { ReactNode } from 'react';
import { NavGroup, NavItem as NavItemType } from '@/_types/Header/Header.type';

interface MobileNavProps<T = NavItemType> {
  mobile: NavGroup[];
  renderTop?: () => ReactNode;
  renderSection?: (section: NavGroup) => ReactNode;
  renderItem?: (item: T) => ReactNode;
}

export const Nav = <T extends NavItemType = NavItemType>({
  mobile,
  renderItem,
  renderTop,
  renderSection,
}: MobileNavProps<T>) => {
  return (
    <div className="fixed z-[1000] w-[75%] p-4 h-screen top-0 right-0 bg-white dark:bg-black select-none">
      {renderTop && renderTop()}

      {mobile.map((section, index) =>
        renderSection ? (
          renderSection(section)
        ) : (
          <NavSection key={`${section.title}-${index}`} section={section} renderItem={renderItem} />
        ),
      )}
    </div>
  );
};

const NavSection = <T extends NavItemType = NavItemType>({
  section,
  renderItem,
}: {
  section: NavGroup;
  renderItem?: (item: T) => ReactNode;
}) => {
  return (
    <div className="py-2">
      <div className="font-bold text-base mb-[4px]">{section.title}</div>
      <ul className="font-light text-sm py-0.5 flex flex-col">
        {section.items.map((item) =>
          renderItem ? renderItem(item as T) : <NavItem key={item.title} {...item} />,
        )}
      </ul>
    </div>
  );
};

const NavItem = ({ path, title }: NavItemType) => {
  return (
    <li className="py-[0.4rem] flex justify-between items-center cursor-pointer">
      <div className="flex items-center gap-2">
        <div className="w-[16px] h-[16px] bg-[#7373739a] rounded-[4px] flex justify-center items-center"></div>
        <span>
          <a href={path}>{title}</a>
        </span>
      </div>
    </li>
  );
};
