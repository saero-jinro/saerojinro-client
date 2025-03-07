'use client';

import { HeaderLinksMobile, HeaderLinksWeb } from './HeaderList';
import { getUserLinks } from '@/_utils/Header/getUserLink';
import { HeaderOverlay, MenuButton } from './HeaderETC';
import { useCallback, useEffect, useState } from 'react';
const MAX_MOBILE_WIDTH = 580;

const HeaderNav = () => {
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);
  const links = getUserLinks('viewer');

  const OpenNavMobile = () => setIsToggle(true);
  const CloseNavMobile = () => setIsToggle(false);

  const resizeHandler = useCallback(() => {
    const stageWidth = window.innerWidth;
    setIsMobile((prev) => {
      const cur = prev !== stageWidth < MAX_MOBILE_WIDTH ? stageWidth < MAX_MOBILE_WIDTH : prev;
      if (prev !== cur) {
        CloseNavMobile();
      }
      return cur;
    });
  }, []);

  useEffect(() => {
    resizeHandler();
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [resizeHandler]);

  // 모바일 x => 웹 링크 nav
  if (!isMobile) return <HeaderLinksWeb links={links} />;

  return (
    <>
      {/* 모바일 O, 토글 true x => 오버레이 + 모바일 링크 nav */}
      {isToggle && (
        <>
          <HeaderOverlay onClickHandler={CloseNavMobile} />
          <HeaderLinksMobile />;
        </>
      )}
      {/* 모바일 X, 토글 X 토글 버튼 on */}
      {isMobile && <MenuButton onClickHandler={OpenNavMobile} />}
    </>
  );
};

export default HeaderNav;
