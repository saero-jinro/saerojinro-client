import Menu from '@/_assets/Header/menu.svg';
import { HTMLAttributes } from 'react';

interface Props extends Omit<HTMLAttributes<HTMLElement>, 'onClick'> {
  onClickHandler: () => void;
}

// 메뉴 토글 버튼(모바일 전용)
export const MenuButton = ({ onClickHandler, ...props }: Props) => {
  return (
    <button aria-label="toggle-menu" onClick={onClickHandler} {...props}>
      <Menu />
    </button>
  );
};

// 오버레이(모바일 전용)
export const HeaderOverlay = ({ onClickHandler, ...props }: Props) => {
  return (
    <div
      {...props}
      onClick={onClickHandler}
      className="w-screen h-screen fixed top-0 left-0 z-[100] bg-[#81818165]"
    />
  );
};
