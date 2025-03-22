'use client';

import { MobileNavigation } from '@/_components/Nav/navigation/HeaderNav.mobile';
import WebNavList from '@/_components/Nav/navigation/HeaderNav.web';
import useHeaderStore from '@/_store/Header/useHeaderStore';
// import useAlarmStore from '@/_store/Header/useAlarmStore';
// import { useHeaderRole } from '@/_hooks/nav/useNav';
// import { Alarm } from '@/_types/Header/Alarm.type';
import ToggleModal from '@/_components/ToggleModal';
import useResize from '@/_hooks/nav/useResize';
import { ReactNode, useEffect } from 'react';
import { MenuButton } from './ETC';
import useAuth from '@/_hooks/auth/useAuth';
import useAlarm from '@/_hooks/nav/useAlarm';
// import { UserRole } from '@/_types/Auth/auth.type';

interface Props {
  children?: ReactNode;
}

// 헤더 네비게이션
const HeaderNav = ({ children }: Props) => {
  // const headerRole = useHeaderRole();
  const viewmode = useHeaderStore((store) => store.viewport.state.mode);
  const isMobileNavOpen = useHeaderStore((store) => store.mobileNavOpen.state.isOpen);
  const openMobileNav = useHeaderStore((store) => store.mobileNavOpen.actions.setOpen);
  const closeMobileNav = useHeaderStore((store) => store.mobileNavOpen.actions.setClose);
  const { name } = useAuth();

  // const nickname: Record<UserRole, string> = {
  //   admin: 'admin',
  //   user: '김철수',
  //   guest: '로그인',
  // };

  // 리사이즈 훅
  useResize();
  useAlarm();

  // web이면 메뉴 닫음
  useEffect(() => {
    if (viewmode === 'web') closeMobileNav();
  }, [viewmode, closeMobileNav]);

  // const addAlarm = useAlarmStore((store) => store.actions.addAlarm);
  // // 더미 삭제 예정
  // const dumyData: Alarm[] = [
  //   {
  //     id: 1,
  //     lectureId: 2,
  //     title: '강의 시간 변경',
  //     contents: `03월 06일 ‘코드 그 너머: 소프트웨어 개발의 미래’
  //     강의가 14시에서 15시로 시간이 변경되었습니다.`,
  //   },
  //   {
  //     id: 1,
  //     lectureId: 2,
  //     title: '강의 시간 변경',
  //     contents: `03월 07일 ‘코드 그 너머: 소프트웨어 개발의 미래’
  //     강의가 13시에서 14시로 시간이 변경되었습니다.`,
  //   },
  //   {
  //     id: 1,
  //     lectureId: 2,
  //     title: '강의 시간 변경',
  //     contents: `03월 06일 ‘코드 그 너머: 소프트웨어 개발의 미래’
  //     강의가  room-a1 에서 room-a2로 변경되었습니다.`,
  //   },
  // ];

  // // 더미 삭제 예정
  // useEffect(() => {
  //   localStorage.removeItem('alarm-storage');
  //   dumyData.forEach((item, idx) => {
  //     setTimeout(() => {
  //       addAlarm(item);
  //     }, idx * 5000);
  //   });
  // }, []);

  /** 웹 모드 **/
  if (viewmode === 'web') {
    return (
      <>
        <WebNavList nickName={name}>{children}</WebNavList>
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
        <MobileNavigation nickName={name} />
      </ToggleModal>

      {!isMobileNavOpen && <MenuButton onClickHandler={openMobileNav} />}
    </>
  );
};

export default HeaderNav;
