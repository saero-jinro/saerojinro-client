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

  const resizeHandler = useCallback(() => {
    const stageWidth = window.innerWidth;
    setIsMobile((prev) => {
      const cur = prev !== stageWidth < MAX_MOBILE_WIDTH ? stageWidth < MAX_MOBILE_WIDTH : prev;
      if (prev !== cur) {
        setIsToggle(false);
      }
      return cur;
    });
  }, []);

  useEffect(() => {
    resizeHandler();
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [resizeHandler]);

  if (!isMobile) return <HeaderLinksWeb links={links} />;

  return (
    <>
      {isToggle && (
        <>
          <HeaderOverlay
            onClickHandler={() => {
              setIsToggle(false);
            }}
          />
          <HeaderLinksMobile />;
        </>
      )}

      {isMobile && (
        <MenuButton
          onClickHandler={() => {
            setIsToggle(true);
          }}
        />
      )}
    </>
  );
};

export default HeaderNav;
