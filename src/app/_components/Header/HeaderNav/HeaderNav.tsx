'use client';

import { MobileNavigation } from '@/_components/Nav/navigation/HeaderNav.mobile';
import { WebNavList } from '@/_components/Nav/navigation/HeaderNav.web';
import ViewportSlice from '@/_store/Header/useHeaderStore';
import { UserRole } from '@/_types/Header/Header.type';
import { ReactNode, useEffect, useState } from 'react';
import { HeaderOverlay, MenuButton } from './ETC';
import useResize from '@/_hooks/nav/useResize';

interface Props {
  children?: ReactNode;
}

// 헤더 네비게이션
const HeaderNav = ({ children }: Props) => {
  const [isToggle, setIsToggle] = useState(false);
  const viewmode = ViewportSlice((store) => store.viewport.state.mode);
  const toggleNavMobile = (state: boolean) => setIsToggle(state);
  const [role, setRole] = useState<UserRole>('viewer'); // 임시 상태 버튼

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

  /** 웹 모드 **/
  if (viewmode === 'web') {
    return (
      <>
        <button onClick={changeRole}>{`권한 변경 버튼(${role})`}</button>
        <WebNavList role={role} nickName={GetNickName(role)}>
          {children}
        </WebNavList>
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
