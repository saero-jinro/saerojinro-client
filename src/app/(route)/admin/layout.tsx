const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* 콘텐츠 영역 - 헤더와의 간격 64px 설정 */}
      <main className="flex-1 p-6 pt-16">{children}</main>
    </div>
  );
};

export default Layout;
