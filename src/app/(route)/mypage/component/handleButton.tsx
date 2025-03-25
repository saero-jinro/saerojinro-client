'use client';

import { handleLogout } from '@/_utils/Auth/logout';
import { usePopup } from '@/_hooks/popup/popup';

export const LogoutButton = () => {
  const onLogout = async () => {
    const success = await handleLogout();
    if (success) {
      window.location.href = '/';
    } else {
      alert('로그아웃 실패. 다시 시도해주세요.');
    }
  };

  const { onOpen, Popup } = usePopup({
    contents: '정말 로그아웃 하시겠습니까?',
    onFunc: () => {
      onLogout();
    },
  });

  return (
    <div className="w-full mt-[40px]">
      <span className="block">현재 계정에서 로그아웃합니다.</span>
      <span className="block">다시 로그인하려면 카카오 계정을 사용해 주세요</span>
      <button
        onClick={onOpen}
        className="block font-semibold px-4 py-2 mt-6 rounded-[4px] border border-solid text-[#9E9E9E] border-[#9E9E9E]"
      >
        로그아웃
      </button>
      <Popup />
    </div>
  );
};

export const UserDeleteButton = () => {
  const { onOpen, Popup } = usePopup({
    contents: '정말 탈퇴하시겠습니까?',
    onFunc: () => {
      console.log('ok');
    },
  });

  return (
    <div className="w-full mt-[40px]">
      <span className="block">회원 탈퇴를 진행하시면 아래 내용이 적용됩니다.</span>
      <span className="block">1. 게정 정보 및 개인 데이터 삭제</span>
      <span className="block">2. 서비스 이용 기록 영구 삭제</span>
      <span className="block">3. 복구가 불가능하며, 동일한 이메일로 재가입이 제한될 수 있음</span>
      <button
        onClick={onOpen}
        className="block font-semibold px-4 py-2 mt-6 rounded-[4px] border border-solid text-[#9E9E9E] border-[#9E9E9E]"
      >
        회원 탈퇴
      </button>
      <Popup />
    </div>
  );
};
