'use client';
import { Theme } from '@/_type/theme';
import { useEffect, useState } from 'react';

const getThemeFromCookie = () => {
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('theme='))
    ?.split('=')[1];

  return cookie === 'dark' ? 'dark' : 'light';
};

const applyTheme = (theme: Theme) => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }
};

const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const storedTheme = getThemeFromCookie();
    setTheme(storedTheme);
    applyTheme(storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000;`;
    applyTheme(newTheme);
    setTheme(newTheme);
  };

  return { toggleTheme, theme };
};

export default useTheme;
