'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || 'http://localhost:3000';
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const router = useRouter();

  useEffect(() => {
    const prevUrl = sessionStorage.getItem('prevUrl');

    if (!code) return;

    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (res.ok) {
          console.log('로그인 성공! 아이디 토큰이 쿠키에 저장됨.');
        } else {
          console.error('카카오 로그인 실패:', await res.json());
        }
      } catch (error) {
        console.error('서버 오류', error);
      }
      router.push(prevUrl ? prevUrl : '/');
    })();
  }, [code, router, BASE_URL]);

  return <></>;
};

export default Page;
