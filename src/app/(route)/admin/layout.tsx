import { AdminAsideNavigation } from '@/_components/Nav/navigation/AsideNav';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* 어드민 사이드 네비게이션 */}
      <AdminAsideNavigation />

      {/* 콘텐츠 영역 */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};
export default Layout;
