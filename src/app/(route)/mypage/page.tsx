'use client';

import { useRouter } from 'next/navigation';

// 초기값 server -> client(상태 초기값) -> update
const Page = () => {
  const navigation = useRouter();
  const logout_test = () => {
    if (typeof window === 'undefined') return;
    // 쿠키 값 만료
    document.cookie = 'id_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    navigation.push('/');
  };

  return (
    <div className="flex w-screen">
      <div className="max-w-[1280px] px-[40px] h-auto w-full flex flex-col mt-16 mx-auto">
        {/* 정보 */}
        <div className="flex gap-6">
          {/* 이미지 */}
          <div>
            <div className="w-[180px] aspect-square bg-black" aria-label="이미지 대체" />
          </div>

          <div className="flex flex-col gap-4 w-[450px]">
            {/* 이름 */}
            <div className="w-[450px] h-[40px] grid grid-cols-[78px_auto] [grid-template-rows:40px] items-center">
              <span className="font-semibold h-full flex items-center">이름</span>
              <div
                id="name"
                aria-label="id"
                className="w-[282px] h-full flex items-center border border-solid border-[#D9D9D9] px-3 rounded-[8px]"
              >
                김지훈
              </div>
            </div>

            {/* 이메일 */}
            <div className="w-[450px] h-[40px] grid grid-cols-[78px_auto] [grid-template-rows:40px] items-center">
              <span className="font-semibold h-full flex items-center">이메일</span>
              <form className="flex mr-1 w-full">
                <input
                  aria-label="email"
                  id="name"
                  type="text"
                  placeholder="이메일을 입력해주세요"
                  className="w-[282px] border border-solid border-[#D9D9D9] px-3 rounded-[8px] mr-3"
                />
                <input
                  aria-label="change-email"
                  className="btn px-4 py-2 rounded-[8px]"
                  value="저장"
                  type="button"
                />
              </form>
            </div>
          </div>
        </div>
        {/* 로그아웃 */}
        <div className="w-full mt-[40px]">
          <span className="block">현재 계정에서 로그아웃합니다.</span>
          <span className="block">다시 로그인하려면 카카오 계정을 사용해 주세요</span>
          <button onClick={logout_test} className="btn block px-4 py-2 mt-6 rounded-[8px]">
            로그아웃
          </button>
        </div>

        {/* 회원탈퇴 */}
        <div className="w-full mt-[40px]">
          <span className="block">1. 회원 탈퇴를 진행하시면 아래 내용이 적용됩니다.</span>
          <span className="block">2. 서비스 이용 기록 영구 삭제</span>
          <span className="block">
            3. 복구가 불가능하며, 동일한 이메일로 재가입이 제한될 수 있음
          </span>
          <button className="btn block px-4 py-2 mt-6 rounded-[8px]">회원 탈퇴</button>
        </div>
      </div>
      <div />
    </div>
  );
};

export default Page;
