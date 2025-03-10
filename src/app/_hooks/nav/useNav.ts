import { NavItem, UserRole } from '@/_types/Header/Header.type';
import { navInfo } from './navDto';
import { useMemo } from 'react';

const filterAccessibleNavItems = (items: NavItem[], userRole: UserRole) =>
  items.filter((item) => item.roles?.includes(userRole));

// 권한에 따른 네비게이션 리스트 반환
export const getUserNavigation = (userRole: UserRole) => {
  const { web, mobile } = navInfo;

  return {
    web: filterAccessibleNavItems(web, userRole),
    mobile: mobile.flatMap((section) => {
      const accessibleItems = filterAccessibleNavItems(section.items, userRole);
      return accessibleItems.length ? [{ ...section, items: accessibleItems }] : [];
    }),
  };
};

export const useNav = (userRole: UserRole) => {
  return useMemo(() => {
    return getUserNavigation(userRole);
  }, [userRole]);
};
