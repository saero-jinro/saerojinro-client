import ClickButton from '@/_components/ClickButton';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLUListElement> {
  colors: string[];
  unsetColor: () => void;
  setColor: (color: string) => void;
}

interface ColorButtonProps {
  color: string;
  onClick: () => void;
}

// 색상 선택 프레임
const ColorPickerView = ({ colors, unsetColor, setColor, ...props }: Props) => {
  return (
    <ul className="flex gap-1 bg-white p-2 rounded-md shadow-md" {...props}>
      <ColorButton color="#fff" onClick={unsetColor} />
      {colors.map((color) => (
        <ColorButton key={color} color={color} onClick={() => setColor(color)} />
      ))}
    </ul>
  );
};

// 색상 선택 아이콘
const ColorButton = ({ color, onClick }: ColorButtonProps) => {
  return (
    <li>
      <ClickButton actionDesc={`set-color-${color}`} onClickAction={onClick}>
        <div
          style={{ backgroundColor: color }}
          className="w-8 h-8 rounded-md border cursor-pointer border-solid border-[#6e6e6e6b]"
        />
      </ClickButton>
    </li>
  );
};

export default ColorPickerView;
