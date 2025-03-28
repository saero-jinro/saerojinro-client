'use client';

import { toggleDarkMode } from '@/_utils/Header/toggleDarkMode';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        toggleDarkMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`${isMainPage ? 'w-full' : 'max-w-7xl mx-auto'} pt-16 md:pt-[80px]`}>
      {children}
    </div>
  );
};

export default LayoutWrapper;
