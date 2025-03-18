'use client';
import KaKaoLogoSvg from '@/assets/Header/kakaologo.svg';
import useLogin from '@/_hooks/login/useLogin';
import ClickButton from '../ClickButton';
import { HTMLAttributes } from 'react';
import Link from 'next/link';

const LoginComponent = (props: HTMLAttributes<HTMLElement>) => {
  const { loginWithKakao } = useLogin();
  return (
    <div {...props}>
      <div className="flex flex-col justify-center items-center gap-6">
        <span className="font-bold text-5xl">IT TIME</span>
        <span className="text-2xl text-wrap">로그인하고 더 편하게 IT 컨퍼런스를 즐겨보세요</span>
      </div>
      <div className="flex flex-col mt-11 gap-[14px]">
        <ClickButton
          actionDesc="user-kakao-login"
          onClickAction={loginWithKakao}
          className="px-7 h-[90px] flex justify-center items-center gap-4 rounded-[12px] bg-[#FEE500] cursor-pointer"
        >
          <KaKaoLogoSvg width="36px" height="36px" />
          <span className="text-3xl">카카오 로그인</span>
        </ClickButton>

        <Link
          href="/login/admin"
          className="px-7 h-[90px] flex justify-center items-center gap-4 rounded-[12px] bg-[#9e9e9e]  cursor-pointer"
        >
          <span className="text-3xl text-[#ffffff]">관리자 로그인</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginComponent;
