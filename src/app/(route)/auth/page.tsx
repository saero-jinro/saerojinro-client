'use client';
import { ApiAuthUserResponse } from '@/_types/Auth/auth.type';
import { useSearchParams, useRouter } from 'next/navigation';
import useAuthStore from '@/_store/auth/useAuth';
import { useEffect } from 'react';

// 로그인 리다이렉트 페이지
const Page = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
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

        setAuth(response.data.accessToken, 'user');
        redirectPrevUrl();
      } catch (error) {
        console.error('서버 오류:', error);
        alert('로그인 실패. 원래 페이지로 되돌아갑니다.');
        redirectPrevUrl();
      }
    })();
  }, [code, router, setAuth, BASE_URL]);

  return <></>;
};

export default Page;
