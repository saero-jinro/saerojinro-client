'use client';
import MobileNavList from '@/_components/Nav/HeaderNav.mobile';
import WebNavList from '@/_components/Nav/HeaderNav.web';
import useHeaderStore from '@/_store/Header/useHeaderStore';
import ToggleModal from '@/_components/ToggleModal';
import useResize from '@/_hooks/nav/useResize';
import React, { ReactNode, useEffect } from 'react';
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

  useEffect(() => {
    if (viewmode === 'web') closeMobileNav();
  }, [viewmode, closeMobileNav]);

  if (viewmode === 'web') {
    return <WebNavList>{children}</WebNavList>;
  }

  return (
    <>
      <ToggleModal
        desc="mobile-nav"
        hasOverlay={true}
        onClose={closeMobileNav}
        isOpen={isMobileNavOpen}
      >
        <MobileNavList />
      </ToggleModal>
      {!isMobileNavOpen && <MenuButton onClickHandler={openMobileNav} />}
    </>
  );
};

export default HeaderNav;
