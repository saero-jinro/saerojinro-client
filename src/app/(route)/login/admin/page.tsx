'use client';

import { ApiAuthUserResponse } from '@/_types/Auth/auth.type';
import useAuthStore from '@/_store/auth/useAuth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// 관리자 로그인 페이지
const AdminLoginPage = () => {
  const [email, setEmail] = useState('alswns11346@kgu.ac.kr');
  const [password, setPassword] = useState('password1234!');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const setAuth = useAuthStore((store) => store.actions.setAuth);

  const handleLogin = async () => {
    setError(null); // 기존 에러 초기화

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('API응답 실패');
      }

      const response = (await res.json()) as ApiAuthUserResponse;

      if (!response.ok || !response.data) {
        throw new Error('액세스 토큰 추출 실패');
      }

      setAuth(response.data.accessToken, 'admin');
      router.push('/admin');
    } catch (error) {
      console.error('서버 오류:', error);
      alert('로그인 실패');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Admin 로그인</h1>
      <div className="bg-white p-6 rounded w-96">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <button onClick={handleLogin} className="w-full bg-blue-500 text-white py-2 rounded">
          로그인
        </button>
      </div>
    </div>
  );
};

export default AdminLoginPage;
