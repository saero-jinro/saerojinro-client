import useTheme from '@/_hooks/useTheme';
import ToggleButton from '../ToggleButton';
import { Theme } from '@/_type/theme';
import { cookies } from 'next/headers';

const View = ({ theme }: { theme: Theme }) => {
  return (
    <span className="border-gray-500 dark:border-gray-300 rounded-lg">
      {theme === 'light' ? '🌙' : '☀️ '}
    </span>
  );
};

export const ClientThemeToggleButton = () => {
  'use client';
  const { toggleTheme, theme } = useTheme();

  return (
    <ToggleButton actionDesc="toggle-theme" onToggle={toggleTheme}>
      <View theme={theme} />
    </ToggleButton>
  );
};

export const ServerThemeToggleButton = async () => {
  const cookieStore = await cookies();
  const theme = (cookieStore.get('theme')?.value as Theme) ?? 'light';
  return <View theme={theme} />;
};
