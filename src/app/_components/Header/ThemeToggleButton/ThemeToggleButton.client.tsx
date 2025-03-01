'use client';

import ToggleButton from '@/_components/ToggleButton';
import ThemeToggleView from './ThemeToggleView';
import useTheme from '@/_hooks/useTheme.test';

const ThemeToggleButton = () => {
  const { toggleTheme, theme } = useTheme();
  return (
    <ToggleButton actionDesc="toggle-theme" onToggle={toggleTheme}>
      <ThemeToggleView theme={theme} />
    </ToggleButton>
  );
};

export default ThemeToggleButton;
