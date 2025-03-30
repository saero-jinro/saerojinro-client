'use client';

import ClickButton from '@/_components/ClickButton';
import { Theme } from '@/_types/Header/Header.type';
import ThemeIcon from '@/assets/Header/theme.svg';
import useTheme from '@/_hooks/useTheme';

const ThemeToggleView = () => {
  return (
    <span className="select-none border-gray-500 dark:border-gray-300 rounded-lg">
      <ThemeIcon />
    </span>
  );
};

interface Props {
  theme: Theme;
}

const ThemeToggleButton = (props: Props) => {
  const { toggleTheme } = useTheme(props.theme);

  return (
    <ClickButton actionDesc="toggle-theme" onClick={toggleTheme}>
      <ThemeToggleView />
    </ClickButton>
  );
};

export default ThemeToggleButton;
