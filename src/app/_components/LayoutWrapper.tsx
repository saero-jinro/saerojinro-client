'use client';

import { usePathname } from 'next/navigation';

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  return (
    <div className={`${isMainPage ? 'w-full' : 'max-w-7xl mx-auto'} pt-[78px]`}>{children}</div>
  );
};

export default LayoutWrapper;
