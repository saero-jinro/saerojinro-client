export type Theme = 'light' | 'dark';

// 추후 권한에 따라 속성 수정 필요
export type UserRole = 'no-login' | 'viewer' | 'editor' | 'admin';

export interface NavItem {
  title: string;
  path: string;
  roles?: UserRole[];
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export type NavigationConfig = {
  web: NavItem[];
  mobile: NavGroup[];
};
