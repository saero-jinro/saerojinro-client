import Image from 'next/image';
import { HTMLAttributes } from 'react';

interface Props extends Omit<HTMLAttributes<HTMLElement>, 'onClick'> {
  onClickHandler: () => void;
}

// 메뉴 토글 버튼(모바일 전용)
export const MenuButton = ({ onClickHandler, ...props }: Props) => {
  return (
    <button aria-label="toggle-menu" onClick={onClickHandler} {...props}>
      <Image alt="menu-icon" width={32} height={32} src="/main/menu.webp" />
    </button>
  );
};

// 오버레이(모바일 전용)
export const HeaderOverlay = ({ onClickHandler, ...props }: Props) => {
  const onKeyHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onClickHandler();
    }
  };
  return (
    <div
      {...props}
      onClick={onClickHandler}
      onKeyDown={onKeyHandler}
      className="w-screen h-screen fixed top-0 left-0 z-[100] bg-[#81818165]"
    />
  );
};
