import { NextResponse } from 'next/server';

export type ApiResponse<T> = {
  ok: boolean;
  data?: T;
  error?: string;
};

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const REDIRECT_URI = `${BASE_URL}/auth`;

    if (!code) {
      return NextResponse.json({ error: 'No authorization code' }, { status: 400 });
    }

    const kakaoTokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
        redirect_uri: REDIRECT_URI,
        code,
      }),
    });

    const tokenData = await kakaoTokenResponse.json();
    const accessToken = tokenData.access_token;
    const idToken = tokenData.id_token;

    const response = NextResponse.json({ message: '로그인 성공' });

    if (idToken) {
      // 일단 발급된 id_token을 쿠키에 저장함 (백엔드 연결 하면 삭제@@@@@@)
      response.cookies.set('id_token', idToken, {
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 0.5, //30m
      });

      // 추후 JWT 티켓 발행
    }

    if (accessToken) {
      try {
        const response = await fetch('https://kapi.kakao.com/v1/user/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          console.log('카카오 로그아웃 성공');
        } else {
          console.error('카카오 로그아웃 실패');
        }
      } catch (error) {
        console.error('로그아웃 요청 오류:', error);
      }
    }

    return response;
  } catch (error) {
    console.error('카카오 로그인 처리 중 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
