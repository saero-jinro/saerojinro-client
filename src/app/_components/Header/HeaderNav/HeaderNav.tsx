'use client';

import { MobileNavList, WebNavList } from './HeaderList';
import { useCallback, useEffect, useState } from 'react';
import { HeaderOverlay, MenuButton } from './ETC';
import { useNav } from '@/_hooks/useNav/useNav';

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

  if (!isMobile) return <WebNavList web={navlist.web} />;

  return (
    <>
      {isToggle && (
        <>
          <MobileNavList mobile={navlist.mobile} />
          <HeaderOverlay onClickHandler={() => toggleNavMobile(false)} />
        </>
      )}
      {!isToggle && <MenuButton onClickHandler={() => toggleNavMobile(true)} />}
    </>
  );
};

export default HeaderNav;
