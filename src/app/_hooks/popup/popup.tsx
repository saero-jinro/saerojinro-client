'use client';
import { PopupComponent } from '@/_components/Popup/Popup';
import ToggleModal from '@/_components/ToggleModal';
import { useCallback, useState } from 'react';

interface Props {
  contents: string; //내용
  onFunc: () => void; // 실행할 함수
}

// 팝업 훅
export const usePopup = ({ contents, onFunc }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  const Popup = useCallback(() => {
    if (!isOpen) return null;

    return (
      <ToggleModal hasOverlay desc="confirm-popup" isOpen={isOpen} onClose={onClose}>
        <PopupComponent
          contents={contents}
          onClick={() => {
            onFunc();
            onClose();
          }}
          onClose={onClose}
        />
      </ToggleModal>
    );
  }, [isOpen, contents, onFunc, onClose]);

  return { onOpen, onClose, Popup };
};

// onOpen 팝업 열기
// onOpen 팝업 닫기
// 팝업 컴포넌트

// 사용방법
// const { onOpen, Popup } = usePopup({
//   contents: '정말 로그아웃 하시겠습니까?',
//   onFunc: () => {
//     실행할 함수수
//   },
// });
// return <>
// <div onClick={onOpen}>
// asdaasdadsa
//<Popup/>
// </div>
//<>
