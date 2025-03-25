'use client';
import LoginComponent from './LoginComponent';
import ClickButton from '../ClickButton';
import ToggleModal from '../ToggleModal';
import { useState } from 'react';

// 로그인 모달
const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  return (
    <>
      <div>
        <ClickButton actionDesc="open-login-modal" onClickAction={onOpen}>
          로그인
        </ClickButton>
        <ToggleModal desc="login-modal" isOpen={isOpen} onClose={onClose} hasOverlay={true}>
          <div className="relative">
            <div className="fixed z-[1000] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
              <div className="text-black dark:text-white bg-white dark:bg-black w-[768px] h-[720px] px-[83px] flex flex-col justify-center scale-80">
                <button
                  aria-label="close-modal"
                  onClick={onClose}
                  className="text-2xl absolute top-[0.5rem] right-[1rem] cursor-pointer"
                >
                  x
                </button>
                <LoginComponent onClose={onClose} />
              </div>
            </div>
          </div>
        </ToggleModal>
      </div>
    </>
  );
};
export default LoginModal;
