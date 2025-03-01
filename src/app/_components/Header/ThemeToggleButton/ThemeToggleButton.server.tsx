import ThemeToggleView from './ThemeToggleView';
import { cookies } from 'next/headers';
import { Theme } from '@/_type/theme';

const ThemeToggleButton = async () => {
  const cookieStore = await cookies();
  const theme = (cookieStore.get('theme')?.value as Theme) ?? 'light';
  return <ThemeToggleView theme={theme} />;
};

export default ThemeToggleButton;
