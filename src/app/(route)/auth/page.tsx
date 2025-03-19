'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { AuthUserResponse, ApiResponse } from '@/_types/api/api.type';
import useAuthStore from '@/_store/auth/useAuth';

type ApiAuthUserResponse = ApiResponse<AuthUserResponse>;

const Page = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const router = useRouter();
  const setAuth = useAuthStore((store) => store.actions.setAuth);

  useEffect(() => {
    if (!code) return;

    const prevUrl = sessionStorage.getItem('prevUrl');
    const redirectPrevUrl = () => {
      router.push(prevUrl ? prevUrl : '/');
    };

    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/auth/user`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });

        if (!res.ok) throw new Error('응답 데이터 실패');

        const response = (await res.json()) as ApiAuthUserResponse;

        if (!response.ok || !response.data) {
          alert('로그인 실패. 원래 페이지로 되돌아갑니다.');
          return redirectPrevUrl();
        }
        // console.log('로그인 성공:', response.data.accessToken);
        setAuth(response.data.accessToken, 'user');
        redirectPrevUrl();
      } catch (error) {
        console.error('서버 오류:', error);
        alert('로그인 실패. 원래 페이지로 되돌아갑니다.');
        redirectPrevUrl();
      }
    })();
  }, [code, router, setAuth]);

  return <></>;
};

export default Page;
