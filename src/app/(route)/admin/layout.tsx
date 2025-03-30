const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full h-screen bg-[#F8FAFC] dark:bg-[#02050C]">
      {/* 콘텐츠 영역 - 헤더와의 간격 64px 설정 */}
      <main className="flex-1 p-6 pt-16">{children}</main>
    </div>
  );
};

export default Layout;
