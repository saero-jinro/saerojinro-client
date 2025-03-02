'use client';
import { useState } from 'react';
import { Theme } from '@/_type/Header/theme';

const useTheme = (initTheme: Theme) => {
  const [theme, setTheme] = useState<Theme>(initTheme);

  // 테마 적용
  const applyTheme = (theme: Theme) => {
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (theme === 'light') {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  // 쿠키 세팅
  const setCookie = (theme: Theme) => {
    if (theme === 'dark') {
      document.cookie = 'theme=dark; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    } else {
      document.cookie = `theme=dark; path=/; max-age=31536000;`;
    }
  };

  // 토글 함수
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setCookie(newTheme);
    applyTheme(newTheme);
    setTheme(newTheme);
  };

  return { toggleTheme, theme };
};

export default useTheme;
