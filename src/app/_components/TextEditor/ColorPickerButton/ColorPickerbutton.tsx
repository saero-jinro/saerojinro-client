import Image from 'next/image';
import { useState } from 'react';
import ColorPickerView from './ColorPickerView';
import ToggleModal from '@/_components/ToggleModal';

export interface Props {
  colors: string[];
  unsetColor: () => void;
  setColor: (color: string) => void;
}

// 클릭하면 색상 선택 모달이 표시됨
const ColorPickerButton = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="relative h-[15px]" onClick={() => setIsOpen(true)}>
      {/* 버튼 모양 */}
      <Image alt="컬러 선택" src="/editor/color.webp" width={15} height={15} />

      {/* 모달 */}
      <ToggleModal
        isOpen={isOpen}
        desc="color-set"
        className="absolute z-[1000]"
        onClose={() => setIsOpen(false)}
      >
        {/* 색상 선택 프레임 */}
        <ColorPickerView {...props} />
      </ToggleModal>
    </span>
  );
};

export default ColorPickerButton;
