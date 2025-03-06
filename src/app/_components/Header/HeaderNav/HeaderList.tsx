import { LinkInfo } from '@/_types/Header/Header.type';
import Link from 'next/link';
import { ReactNode } from 'react';
import Right from '@/assets/header/right.svg';

interface HeaderLinksProps {
  links: LinkInfo[];
  children?: ReactNode;
}

// 헤더 링크
export const HeaderLinksWeb = ({ links }: HeaderLinksProps) => {
  return (
    <div className="flex gap-4">
      <ul className="flex gap-4">
        {links.map((item) => (
          <HeaderListWeb key={item.title} {...item} />
        ))}
      </ul>
      <span>김기준님</span>
    </div>
  );
};

// 링크 리스트
const HeaderListWeb = ({ desc, link, title }: LinkInfo) => {
  return (
    <li className="">
      <Link className="hover:brightness-50" href={link} aria-label={desc}>
        {title}
      </Link>
    </li>
  );
};

// 헤더 링크
export const HeaderLinksMobile = () => {
  return (
    <div className="fixed z-[1000] w-[75%] p-4 h-screen top-0 right-0 bg-white dark:bg-black">
      <div className="flex items-end h-[28px] mb-2 gap-[0.5px]">
        <span className="text-[14px]">김기준님</span>
      </div>

      <div className="py-2">
        <div className="font-bold text-base mb-[4px]">나의 정보</div>
        <ul className="font-light text-sm py-0.5 flex flex-col">
          <li className="py-[0.4rem] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-[16px] h-[16px] bg-[#7373739a] rounded-[4px] flex justify-center items-center"></div>
              <span>마이 페이지</span>
            </div>
            <Right width="20" height="20" />
          </li>

          <li className="py-[0.4rem] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-[16px] h-[16px] bg-[#7373739a] rounded-[4px] flex justify-center items-center"></div>
              <span>강의 관리</span>
            </div>
            <Right width="20" height="20" />
          </li>

          <li className="py-[0.4rem] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-[16px] h-[16px] bg-[#7373739a] rounded-[4px] flex justify-center items-center"></div>
              <span>강의 등록</span>
            </div>
            <Right width="20" height="20" />
          </li>
        </ul>
      </div>

      <div className="py-2">
        <div className="font-bold text-base mb-[4px]">강의 서비스</div>
        <ul className="font-light text-sm py-0.5 flex flex-col">
          <li className="py-[0.4rem] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-[16px] h-[16px] bg-[#7373739a] rounded-[4px] flex justify-center items-center"></div>
              <span>강의 목록</span>
            </div>
            <Right width="20" height="20" />
          </li>

          <li className="py-[0.4rem] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-[16px] h-[16px] bg-[#7373739a] rounded-[4px] flex justify-center items-center"></div>
              <span>시간표</span>
            </div>
            <Right width="20" height="20" />
          </li>
        </ul>
      </div>
    </div>
  );
};
