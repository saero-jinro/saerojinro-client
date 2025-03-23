'use client';

import { MobileNavigation } from '@/_components/Nav/navigation/HeaderNav.mobile';
import WebNavList from '@/_components/Nav/navigation/HeaderNav.web';
import useHeaderStore from '@/_store/Header/useHeaderStore';
import ToggleModal from '@/_components/ToggleModal';
import useResize from '@/_hooks/nav/useResize';
import { ReactNode, useEffect } from 'react';
import { MenuButton } from './ETC';
import useAlarm from '@/_hooks/nav/useAlarm';
import useAuth from '@/_hooks/auth/useAuth';

interface Props {
  children?: ReactNode;
}

// 헤더 네비게이션
const HeaderNav = ({ children }: Props) => {
  const viewmode = useHeaderStore((store) => store.viewport.state.mode);
  const isMobileNavOpen = useHeaderStore((store) => store.mobileNavOpen.state.isOpen);
  const openMobileNav = useHeaderStore((store) => store.mobileNavOpen.actions.setOpen);
  const closeMobileNav = useHeaderStore((store) => store.mobileNavOpen.actions.setClose);

  useResize();
  useAlarm();
  useAuth();

  // web이면 메뉴 닫음
  useEffect(() => {
    if (viewmode === 'web') closeMobileNav();
  }, [viewmode, closeMobileNav]);

  /** 웹 모드 **/
  if (viewmode === 'web') {
    return (
      <>
        <WebNavList>{children}</WebNavList>
      </>
    );
  }

  /** 모바일 모드 **/
  return (
    <>
      <ToggleModal
        isMobile={true}
        desc="mobile-nav"
        hasOverlay={true}
        onClose={closeMobileNav}
        isOpen={isMobileNavOpen}
      >
        <MobileNavigation />
      </ToggleModal>

      {!isMobileNavOpen && <MenuButton onClickHandler={openMobileNav} />}
    </>
  );
};

export default HeaderNav;
