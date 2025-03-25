'use client';

import ClickButton from '@/_components/ClickButton';
import { Theme } from '@/_types/Header/Header.type';
import ThemeToggleView from './ThemeToggleView';
import useTheme from '@/_hooks/useTheme';

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
