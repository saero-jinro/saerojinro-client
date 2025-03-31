import { Theme } from '@/_types/Header/Header.type';
import DarkModeButton from './DarkModeButton';

interface Props {
  theme: Theme;
}

const DarkMode = ({ theme }: Props) => {
  return (
    <div className="w-full flex flex-row items-center justify-between mt-10">
      <span className="text-xl font-semibold">모드 선택</span>
      <DarkModeButton theme={theme} />
    </div>
  );
};

export default DarkMode;
