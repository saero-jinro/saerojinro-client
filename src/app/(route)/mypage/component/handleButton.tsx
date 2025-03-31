'use client';
import useHeaderStore from '@/_store/Header/useHeaderStore';
import { handleLogout } from '@/_utils/Auth/logout';
import ClickButton from '@/_components/ClickButton';

export const LogoutButton = () => {
  const showPopup = useHeaderStore((store) => store.popup.actions.showPopup);

  const onOpen = () =>
    showPopup({
      contents: '정말 로그아웃 하시겠습니까?',
      func: () => {
        onLogout();
      },
    });

  const onFail = () =>
    showPopup({
      contents: '로그아웃을 실패 하였습니다! err:(',
    });

  const onLogout = async () => {
    const success = await handleLogout();
    if (success) {
      window.location.href = '/';
    } else {
      onFail();
    }
  };

  return (
    <div className="w-full text-[#757575] dark:text-[#62748E]">
      <span className="block">현재 계정에서 로그아웃합니다.</span>
      <span className="block">다시 로그인하려면 카카오 계정을 사용해 주세요</span>
      <ClickButton
        actionDesc="logout"
        onClick={onOpen}
        className="block font-semibold px-4 py-2 mt-6 rounded-[4px] text-[#757575] dark:text-[#62748E] shadow-[0_0_0_1px_#9E9E9E] dark:shadow-[0_0_0_1px_#62748E]"
      >
        로그아웃
      </ClickButton>
      {/* <Popup /> */}
    </div>
  );
};

export const UserDeleteButton = () => {
  const showPopup = useHeaderStore((store) => store.popup.actions.showPopup);

  const onOpen = () =>
    showPopup({
      contents: '정말 탈퇴하시겠습니까??',
      func: () => {
        onLogout();
      },
    });

  const onFail = () =>
    showPopup({
      contents: '회원 탈퇴를 실패 하였습니다! err:(',
    });

  const onLogout = async () => {
    const success = await handleLogout();
    if (success) {
      window.location.href = '/';
    } else {
      onFail();
    }
  };

  return (
    <div className="w-full text-[#757575] dark:text-[#62748E]">
      <span className="block">회원 탈퇴를 진행하시면 아래 내용이 적용됩니다.</span>
      <span className="block">1. 게정 정보 및 개인 데이터 삭제</span>
      <span className="block">2. 서비스 이용 기록 영구 삭제</span>
      <span className="block">3. 복구가 불가능하며, 동일한 이메일로 재가입이 제한될 수 있음</span>
      <ClickButton
        actionDesc="delete-user"
        onClick={onOpen}
        className="block font-semibold px-4 py-2 mt-6 rounded-[4px] text-[#757575] dark:text-[#62748E] shadow-[0_0_0_1px_#9E9E9E] dark:shadow-[0_0_0_1px_#62748E]"
      >
        회원 탈퇴
      </ClickButton>
    </div>
  );
};
