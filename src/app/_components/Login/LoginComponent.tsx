'use client';
import KaKaoLogoSvg from '@/assets/Header/kakaologo.svg';
import useLogin from '@/_hooks/login/useLogin';
import ClickButton from '../ClickButton';
import { usePathname } from 'next/navigation';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLElement> {
  onClose?: () => void;
}

// 로그인 컴포넌트
const LoginComponent = ({ onClose, ...props }: Props) => {
  const { loginWithKakao } = useLogin();
  const pathname = usePathname();

  const onClickhandler = () => {
    if (onClose) onClose();
    const cachePath = sessionStorage.getItem('prevUrl');
    const prevPath = pathname === '/login' ? (cachePath ?? '/') : pathname;
    loginWithKakao(prevPath);
  };

  return (
    <div {...props}>
      <div className="flex flex-col justify-center items-center gap-6 text-[#212121] dark:text-[#fff]">
        <span className="font-bold text-5xl">IT TIME</span>
        <span className="text-2xl text-wrap">로그인하고 더 편하게 IT 컨퍼런스를 즐겨보세요</span>
      </div>
      <div className="flex flex-col mt-11 gap-[14px]">
        <ClickButton
          actionDesc="user-kakao-login"
          onClick={onClickhandler}
          className="px-7 h-[90px] flex justify-center items-center gap-4 rounded-[12px] text-[#000000d9] bg-[#FEE500] cursor-pointer"
        >
          <KaKaoLogoSvg width="36px" height="36px" />
          <span className="text-3xl">카카오 로그인</span>
        </ClickButton>
      </div>
    </div>
  );
};

export default LoginComponent;
