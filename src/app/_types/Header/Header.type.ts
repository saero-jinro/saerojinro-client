import { ReactNode } from 'react';
import { UserRole } from '../Auth/auth.type';

export type Theme = 'light' | 'dark';

// 추후 권한에 따라 속성 수정 필요

export type NavItem = {
  title: string;
  path: string;
  roles?: UserRole[];
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export type NavigationConfig = {
  web: NavItem[];
  mobile: NavGroup[];
};

export type RenderItem<T = NavItem> = (item: T) => ReactNode;

export type RenderSection<T = NavItem> = (
  section: NavGroup,
  renderItem: RenderItem<T>,
) => ReactNode;

export interface NavSectionProps {
  section: NavGroup;
  renderItem: RenderItem;
}
