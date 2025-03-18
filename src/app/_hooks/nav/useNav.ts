'use client';
import { NavItem, UserRole } from '@/_types/Header/Header.type';
import { navInfo } from './navDto';
import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

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

/* 
1. path가 admin 경로면 admin 권한
2. 액세스 토큰이 있다면 viewer
3. 해당하지 않으면 no-login
*/
export interface HeaderRoleState {
  role: UserRole;
  pathname: string;
}

export const useHeaderRole = (): HeaderRoleState => {
  const [role, setRole] = useState<UserRole>('no-login');
  const pathname = usePathname();

  const findToken = (tokenName: string): boolean => {
    if (typeof window === 'undefined') return false;

    return document.cookie.split('; ').some((cookie) => cookie.startsWith(`${tokenName}=`));
  };

  useEffect(() => {
    let newRole: UserRole = 'no-login';

    if (pathname.startsWith('/admin')) {
      newRole = 'admin';
    } else if (findToken('admin_token')) {
      newRole = 'admin';
    } else if (findToken('id_token')) {
      newRole = 'viewer';
    }

    setRole((prevRole) => (prevRole !== newRole ? newRole : prevRole));
  }, [pathname]);

  return { role, pathname };
};
