import { NavGroup, NavigationConfig, NavItem, UserRole } from '@/_types/Header/Header.type';

// 웹 네비게이션 목록
const web: NavItem[] = [
  { title: '강의 목록', path: '#', roles: ['no-login', 'viewer', 'editor', 'admin'] },
  { title: '강의 관리', path: '#', roles: ['editor'] },
  { title: '시간표 관리', path: '#', roles: ['no-login', 'viewer'] },
]; // 마이페이지랑 운영자 같은 경우 이름을 클릭하면 이동한다. 마이페이지 배제

// 모바일 네비게이션 목록
const mobile: NavGroup[] = [
  {
    title: '내 정보 서비스',
    items: [{ title: '내 정보 수정', path: '#', roles: ['viewer', 'editor'] }],
  },
  {
    title: '강의 서비스',
    items: [
      { title: '강의 목록', path: '#', roles: ['no-login', 'viewer', 'editor'] },
      { title: '시간표 관리', path: '#', roles: ['no-login', 'viewer'] },
      { title: '내 강의 관리', path: '#', roles: ['editor'] },
      { title: '강의 신청', path: '#', roles: ['editor'] },
    ],
  },
  {
    title: '운영 서비스',
    items: [
      { title: '대시 보드', path: '#', roles: ['admin'] },
      { title: '강의 리스트', path: '#', roles: ['admin'] },
      { title: '강의 리뷰 관리', path: '#', roles: ['admin'] },
      { title: '강의 승인 요청', path: '#', roles: ['admin'] },
      { title: '강의 권한 수정', path: '#', roles: ['admin'] },
    ],
  },
  {
    title: '알림 관리',
    items: [{ title: '알림 보내기', path: '#', roles: ['admin'] }],
  },
];

export const navInfo: NavigationConfig = {
  web,
  mobile,
};

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
