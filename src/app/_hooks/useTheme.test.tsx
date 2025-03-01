'use client';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const useTheme = () => {
  const getThemeFromCookie = () => {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('theme='))
      ?.split('=')[1];
    return cookie === 'dark' ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState<Theme>(() => getThemeFromCookie());

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    // compute reverse theme
    const newTheme = theme === 'light' ? 'dark' : 'light';

    // set cookie
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000;`;

    // set className
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // set state
    setTheme(newTheme);
  };

  return { toggleTheme, theme };
};

export default useTheme;
