import { NavItem, NavGroup } from '@/_types/Header/Header.type';
import Right from '@/assets/Header/right.svg';
import Link from 'next/link';

interface WebNavListProps {
  web: NavItem[];
}

// 웹
export const WebNavList = ({ web }: WebNavListProps) => {
  return (
    <div className="flex justify-center items-center gap-2 text-sm select-none">
      <nav>
        <ol className="flex gap-2 items-center tracking-tighter">
          {/* 아이템 */}
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

/** ---------------------------------------------------------------------------------------------------------- **/
// 모바일

interface MobileNavListProps {
  mobile: Array<NavGroup | null>;
}

export const MobileNavList = ({ mobile }: MobileNavListProps) => {
  return (
    <div className="fixed z-[1000] w-[75%] p-4 h-screen top-0 right-0 bg-white dark:bg-black select-none">
      <div className="flex items-end h-[28px] mb-2 gap-[0.5px]">
        <span className="text-[14px]">김기준님</span>
      </div>

      {mobile &&
        mobile.map((item, index) => (
          <div key={`${item?.title}-${index}`} className="py-2">
            <div className="font-bold text-base mb-[4px]">{item?.title}</div>

            <ul className="font-light text-sm py-0.5 flex flex-col">
              {item?.items?.map((props) => <MobileNavItem key={props.title} {...props} />)}
            </ul>
          </div>
        ))}
    </div>
  );
};

export const MobileNavItem = ({ path, title }: NavItem) => {
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
