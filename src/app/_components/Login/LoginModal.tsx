'use client';
import useLoginModalStore from '@/_store/modal/useLoginModalStore';
import LoginComponent from './LoginComponent';
import ToggleModal from '../ToggleModal';
import ClickButton from '../ClickButton';
import CancleButton from '@/assets/Modal/cancle.svg';

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
        <div className="fixed overflow-hidden z-[1000] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 scale-[45%] xs:scale-[60%] md:scale-[100%]">
          <div className="text-black dark:text-white bg-white dark:bg-[#0F172B] w-[768px] h-[720px] px-[83px] flex flex-col justify-center">
            <ClickButton
              actionDesc="close-modal"
              onClick={close}
              className="text-2xl absolute top-6 right-6 cursor-pointer"
            >
              <CancleButton />
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
