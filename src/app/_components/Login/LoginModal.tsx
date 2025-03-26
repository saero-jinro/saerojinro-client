'use client';
import useLoginModalStore from '@/_store/modal/useLoginModalStore';
import LoginComponent from './LoginComponent';
import ToggleModal from '../ToggleModal';
import ClickButton from '../ClickButton';

// 로그인 모달
const LoginModal = () => {
  const { isOpen, open, close } = useLoginModalStore();

  return (
    <>
      <ToggleModal
        className="overflow-hidden"
        desc="login-modal"
        isOpen={isOpen}
        onClose={close}
        hasOverlay={true}
      >
        {/* <div className="relative"> */}
        <div className="fixed overflow-hidden z-[1000] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 scale-[35%] xs:scale-[50%] md:scale-[80%]">
          <div className="text-black dark:text-white bg-white dark:bg-black w-[768px] h-[720px] px-[83px] flex flex-col justify-center">
            <ClickButton
              actionDesc="close-modal"
              onClick={close}
              className="text-2xl absolute top-[0.5rem] right-[1rem] cursor-pointer"
            >
              x
            </ClickButton>
            <LoginComponent onClose={open} />
          </div>
        </div>
        {/* </div> */}
      </ToggleModal>
    </>
  );
};
export default LoginModal;
