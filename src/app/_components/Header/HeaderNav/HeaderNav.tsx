'use client';

import { MobileNavigation } from '@/_components/Nav/navigation/HeaderNav.mobile';
import { WebNavList } from '@/_components/Nav/navigation/HeaderNav.web';
import ViewportSlice from '@/_store/Main/viewportStore';
import { ReactNode, useEffect, useState } from 'react';
import { HeaderOverlay, MenuButton } from './ETC';
import useResize from '@/_hooks/nav/useResize';
import { useNav } from '@/_hooks/nav/useNav';

interface Props {
  children?: ReactNode;
}

// 헤더 네비게이션
const HeaderNav = ({ children }: Props) => {
  const [isToggle, setIsToggle] = useState(false);
  const viewmode = ViewportSlice((store) => store.state.mode);
  const toggleNavMobile = (state: boolean) => setIsToggle(state);
  const [role, setRole] = useState<'viewer' | 'admin'>('viewer'); // 임시 상태 버튼
  const navlist = useNav(role);
  // 리사이즈 훅
  useResize();

  // web이면 메뉴 닫음
  useEffect(() => {
    if (viewmode === 'web') setIsToggle(false);
  }, [viewmode, setIsToggle]);

  if (viewmode === 'web')
    return (
      <>
        <button
          onClick={() => {
            setRole((prev) => {
              if (prev === 'viewer') return 'admin';
              return 'viewer';
            });
          }}
        >
          {role === 'viewer' ? '어드민 전환 버튼' : '참가자 전환 버튼'}
        </button>
        <WebNavList web={navlist.web}>{children}</WebNavList>
      </>
    );

  return (
    <>
      {isToggle && (
        <>
          <MobileNavigation navDtos={navlist.mobile} />
          <HeaderOverlay onClickHandler={() => toggleNavMobile(false)} />
        </>
      )}
      {!isToggle && <MenuButton onClickHandler={() => toggleNavMobile(true)} />}
    </>
  );
};

export default HeaderNav;
