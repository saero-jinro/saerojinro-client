'use client';
import { NavItem } from '@/_types/Header/Header.type';
import { UserRole } from '@/_types/Auth/auth.type';
import { useMemo } from 'react';

// 웹 네비게이션 목록
const web: NavItem[] = [
  { title: '강의 목록', path: '/lecture-list/?day=Day1&category=ALL', roles: ['guest', 'user'] },
  { title: '시간표 관리', path: '/timetable/?day=Day1', roles: ['guest', 'user'] },
  { title: '대시보드', path: '/admin', roles: ['admin'] },
  { title: '알림관리', path: '/admin/alarm', roles: ['admin'] },
];

export const navInfo: { web: NavItem[] } = {
  web,
};

const filterAccessibleNavItems = (items: NavItem[], userRole: UserRole) =>
  items.filter((item) => item.roles?.includes(userRole));

// 권한에 따른 네비게이션 리스트 반환
export const getUserNavigation = (userRole: UserRole) => {
  const { web } = navInfo;

  return {
    web: filterAccessibleNavItems(web, userRole),
  };
};

export const useNav = (userRole: UserRole) => {
  return useMemo(() => {
    return getUserNavigation(userRole);
  }, [userRole]);
};
