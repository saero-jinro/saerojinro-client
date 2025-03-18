'use client';

import { MobileNavigation } from '@/_components/Nav/navigation/HeaderNav.mobile';
import WebNavList from '@/_components/Nav/navigation/HeaderNav.web';
import useHeaderStore from '@/_store/Header/useHeaderStore';
import useAlarmStore from '@/_store/Header/useAlarmStore';
import { UserRole } from '@/_types/Header/Header.type';
import { ReactNode, useEffect, useState } from 'react';
import { HeaderOverlay, MenuButton } from './ETC';
import useResize from '@/_hooks/nav/useResize';
import { Alarm } from '@/_types/Header/Alarm.type';

interface Props {
  children?: ReactNode;
}

// 헤더 네비게이션
const HeaderNav = ({ children }: Props) => {
  const [role, setRole] = useState<UserRole>('viewer');
  const [isToggle, setIsToggle] = useState(false);
  const viewmode = useHeaderStore((store) => store.state.mode);
  const toggleNavMobile = (state: boolean) => setIsToggle(state);
  const addAlarm = useAlarmStore((store) => store.actions.addAlarm);

  const dumyData: Alarm[] = [
    {
      id: 1,
      lectureId: 2,
      title: '강의 시간 변경',
      contents: `03월 06일 ‘코드 그 너머: 소프트웨어 개발의 미래’
      강의가 14시에서 15시로 시간이 변경되었습니다.`,
    },
    {
      id: 1,
      lectureId: 2,
      title: '강의 시간 변경',
      contents: `03월 07일 ‘코드 그 너머: 소프트웨어 개발의 미래’
      강의가 13시에서 14시로 시간이 변경되었습니다.`,
    },
    {
      id: 1,
      lectureId: 2,
      title: '강의 시간 변경',
      contents: `03월 06일 ‘코드 그 너머: 소프트웨어 개발의 미래’
      강의가  room-a1 에서 room-a2로 변경되었습니다.`,
    },
  ];

  // 리사이즈 훅
  useResize();

  // web이면 메뉴 닫음
  useEffect(() => {
    if (viewmode === 'web') setIsToggle(false);
  }, [viewmode, setIsToggle]);

  // 가상 넥넴
  const GetNickName = (role: UserRole) => {
    if (role === 'no-login') return 'null';
    if (role === 'viewer') return '김철수';
    return 'admin';
  };

  // 가상 권한
  const changeRole = () => {
    setRole((prev) => {
      if (prev === 'viewer') return 'admin';
      if (prev === 'admin') return 'no-login';
      return 'viewer';
    });
  };

  // SSE 여기에 이벤트 구독 필요
  useEffect(() => {
    localStorage.removeItem('alarm-storage');
    dumyData.forEach((item, idx) => {
      setTimeout(() => {
        addAlarm(item);
      }, idx * 5000);
    });
  }, []);

  /** 웹 모드 **/
  if (viewmode === 'web') {
    return (
      <>
        <button onClick={changeRole}>{`권한 변경 버튼(${role})`}</button>
        <WebNavList nickName={GetNickName(role)}>{children}</WebNavList>
      </>
    );
  }

  /** 모바일 모드 **/
  return (
    <>
      {isToggle && (
        <>
          <MobileNavigation role={role} nickName={GetNickName(role)} />
          <HeaderOverlay onClickHandler={() => toggleNavMobile(false)} />
        </>
      )}
      {!isToggle && <MenuButton onClickHandler={() => toggleNavMobile(true)} />}
    </>
  );
};

export default HeaderNav;
