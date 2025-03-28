'use client';

import { ApiAuthUserResponse } from '@/_types/Auth/auth.type';
import useAuthStore from '@/_store/auth/useAuth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('alswns11346@kgu.ac.kr');
  const [password, setPassword] = useState('password1234!');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const setAuth = useAuthStore((store) => store.actions.setAuth);

  const handleLogin = async () => {
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError('이메일 형식을 확인해주세요.');
      return;
    }

    if (password.length < 6) {
      setError('비밀번호는 6자리 이상이어야 합니다.');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error('API 응답 실패');

      const response = (await res.json()) as ApiAuthUserResponse;

      if (!response.ok || !response.data) throw new Error('액세스 토큰 추출 실패');

      setAuth(response.data.accessToken, 'admin');
      router.push('/admin');
    } catch (err) {
      console.error('서버 오류:', err);
      setError('로그인 실패. 이메일과 비밀번호를 다시 확인해주세요.');
    }
  };
  return (
    <div className="max-w-[1280px] dark:bg-[#02050C] w-full h-screen self-stretch px-10 py-16 bg-color-bg-secondary inline-flex flex-col justify-center items-center gap-10 overflow-hidden">
      <div className="justify-start text-color-text-primary text-3xl font-bold font-['Pretendard'] leading-10">
        관리자 로그인
      </div>
      <div className="w-96 flex flex-col justify-start items-start gap-6">
        {/* 이메일 입력 */}
        <div className="self-stretch flex flex-col justify-center items-start gap-2">
          <div className="justify-start text-color-text-primary text-base font-bold font-['Pretendard'] leading-snug">
            이메일
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요"
            className="w-96 h-12 px-4 bg-color-bg-enabled rounded-sm text-color-text-primary placeholder:text-color-text-disabled font-['Pretendard']"
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="self-stretch flex flex-col justify-center items-start gap-2">
          <div className="justify-start text-color-text-primary text-base font-bold font-['Pretendard'] leading-snug">
            비밀번호
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
            className="w-96 h-12 px-4 bg-color-bg-enabled rounded-sm text-color-text-primary placeholder:text-color-text-disabled font-['Pretendard']"
          />
        </div>
      </div>

      {/* 에러 메시지 */}
      {error && <p className="text-red-500 font-['Pretendard']">{error}</p>}

      {/* 로그인 버튼 */}
      <button
        onClick={handleLogin}
        data-device="web"
        data-radius="2px"
        data-state="default"
        data-style="filled"
        data-type="primary"
        className="w-96 h-12 px-4 py-1 bg-color-bg-interactive-primary rounded-sm inline-flex justify-center items-center gap-2 font-semibold btn "
      >
        로그인
      </button>
    </div>
  );
};

export default AdminLoginPage;
