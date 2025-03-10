import { HTMLAttributes, ReactNode } from 'react';
import { NavGroup, NavItem, RenderItem, RenderSection } from '@/_types/Header/Header.type';

export interface MobileNavProps<T = NavItem> extends HTMLAttributes<HTMLElement> {
  navDto: NavGroup[];
  renderTop?: () => ReactNode;
  renderItem: RenderItem<T>;
  renderSection: RenderSection<T>;
}

export const Nav = <T extends NavItem = NavItem>({
  navDto,
  renderItem,
  renderTop,
  renderSection,
  ...props
}: MobileNavProps<T>) => {
  return (
    <nav {...props}>
      {renderTop && renderTop()}
      <nav {...props}>
        {renderTop && renderTop()}
        {navDto.filter(Boolean).map((section) => renderSection(section, renderItem))}
      </nav>
    </nav>
  );
};
