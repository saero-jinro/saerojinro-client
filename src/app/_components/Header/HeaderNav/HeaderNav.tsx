'use client';

import { MobileNavigation } from '@/_components/Nav/navigation/HeaderNav.mobile';
import { WebNavList } from '@/_components/Nav/navigation/HeaderNav.web';
import { useCallback, useEffect, useState } from 'react';
import { HeaderOverlay, MenuButton } from './ETC';
import { useNav } from '@/_hooks/nav/useNav';
import useLogin from '@/_hooks/login/useLogin';

const MAX_MOBILE_WIDTH = 769;

// 헤더 네비게이션
const HeaderNav = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navlist = useNav('viewer');

  const toggleNavMobile = (state: boolean) => setIsToggle(state);

  const resizeHandler = useCallback(() => {
    const isNowMobile = window.innerWidth < MAX_MOBILE_WIDTH;
    setIsMobile((prev) => {
      if (prev !== isNowMobile) toggleNavMobile(false);
      return isNowMobile;
    });
  }, []);

  useEffect(() => {
    resizeHandler();
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [resizeHandler]);

  if (!isMobile)
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
