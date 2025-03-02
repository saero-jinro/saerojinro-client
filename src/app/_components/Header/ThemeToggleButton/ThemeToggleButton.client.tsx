'use client';

import ClickButton from '@/_components/Header/ClickButton';
import ThemeToggleView from './ThemeToggleView';
import { Theme } from '@/_type/Header/theme';
import useTheme from '@/_hooks/useTheme';

interface Props {
  theme: Theme;
}

const ThemeToggleButton = (props: Props) => {
  const { toggleTheme, theme } = useTheme(props.theme);
  return (
    <ClickButton actionDesc="toggle-theme" onClickAction={toggleTheme}>
      <ThemeToggleView theme={theme} />
    </ClickButton>
  );
};

export default ThemeToggleButton;
