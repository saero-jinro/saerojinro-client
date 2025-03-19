import { NextResponse } from 'next/server';

export type ApiResponse<T> = {
  ok: boolean;
  data?: T;
  error?: string;
};

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    const BACK_URL = process.env.NEXT_PUBLIC_BACKEND_AUTH_API;
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

    if (idToken) {
      const backendResponse = await fetch(`${BACK_URL}/api/auth/kakao/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (!backendResponse.ok) {
        return NextResponse.json({ error: '백엔드 로그인 실패' }, { status: 500 });
      }

      let backendData;

      try {
        backendData = await backendResponse.json();
      } catch (error) {
        return NextResponse.json({ error: '백엔드 응답이 JSON이 아님' }, { status: 500 });
      }

      const userAccessToken = backendData.accessToken;
      const userRefreshToken = backendData.refreshToken;

      if (!userAccessToken || !userRefreshToken) {
        return NextResponse.json({ error: '토큰 발급 실패' }, { status: 500 });
      }

      const response = NextResponse.json({
        message: '로그인 성공',
        accessToken: userAccessToken,
        refreshToken: userRefreshToken,
      });

      response.cookies.set('accessToken', userAccessToken, {
        httpOnly: false, // 개발 단계에서는 접근이 가능해야함
        secure: true,
        sameSite: 'strict',
        path: '/',
      });

      response.cookies.set('refreshToken', userRefreshToken, {
        httpOnly: false,
        secure: true,
        sameSite: 'strict',
        path: '/',
      });
    }

    return response;
  } catch (error) {
    console.error('카카오 로그인 처리 중 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
