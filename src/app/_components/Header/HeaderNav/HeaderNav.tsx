'use client';

import { MobileNavigation } from '@/_components/Nav/navigation/HeaderNav.mobile';
import { WebNavList } from '@/_components/Nav/navigation/HeaderNav.web';
import ViewportSlice from '@/_store/Main/viewportStore';
import { HeaderOverlay, MenuButton } from './ETC';
import useResize from '@/_hooks/nav/useResize';
import { useNav } from '@/_hooks/nav/useNav';
import { useEffect, useState } from 'react';

// 헤더 네비게이션
const HeaderNav = () => {
  const navlist = useNav('viewer');
  const [isToggle, setIsToggle] = useState(false);
  const viewmode = ViewportSlice((store) => store.state.mode);
  const toggleNavMobile = (state: boolean) => setIsToggle(state);

  // 리사이즈 훅
  useResize();

  // web이면 메뉴 닫음
  useEffect(() => {
    if (viewmode === 'web') setIsToggle(false);
  }, [viewmode, setIsToggle]);

  if (viewmode === 'web')
    return (
      <>
        <WebNavList web={navlist.web} />
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
