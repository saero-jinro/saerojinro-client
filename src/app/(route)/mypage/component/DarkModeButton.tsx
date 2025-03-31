'use client';

import ClickButton from '@/_components/ClickButton';
import { Theme } from '@/_types/Header/Header.type';
import useTheme from '@/_hooks/useTheme';

interface Props {
  theme: Theme;
}
// 클라이언트 버튼
const DarkModeButton = (props: Props) => {
  const { toggleTheme, theme } = useTheme(props.theme);
  return (
    <ClickButton
      actionDesc="change-theme"
      onClick={toggleTheme}
      className="btn font-semibold py-1 px-4 h-12 cursor-pointer rounded-[2px]"
    >
      {theme === 'dark' ? '라이트모드' : '다크모드'}
    </ClickButton>
  );
};

export default DarkModeButton;
