import { NextResponse } from 'next/server';

const decodeJWT = (token: string) => {
  try {
    const base64Payload = token.split('.')[1];
    const jsonPayload = decodeURIComponent(
      atob(base64Payload)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join(''),
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
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

    // 카카오 토큰 요청
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
    const idToken = tokenData.id_token;
    // console.log(idToken);
    if (!idToken) {
      console.error('idToken을 받지 못함:', tokenData);
      return NextResponse.json({ error: 'idToken 발급 실패' }, { status: 500 });
    }

    const decodeDto = decodeJWT(idToken);

    // 백엔드 로그인 요청
    const backendResponse = await fetch(`${BACK_URL}/api/auth/kakao/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    if (!backendResponse.ok) {
      console.error('백엔드 로그인 실패. 상태 코드:', backendResponse.status);
      return NextResponse.json({ error: '백엔드 로그인 실패' }, { status: backendResponse.status });
    }

    let backendData;
    try {
      backendData = await backendResponse.json();
    } catch (error) {
      console.error('백엔드 응답 JSON 파싱 실패:', error);
      return NextResponse.json({ error: '백엔드 응답이 JSON이 아님' }, { status: 500 });
    }

    const userAccessToken = backendData.accessToken;
    const userRefreshToken = backendData.refreshToken;

    if (!userAccessToken || !userRefreshToken) {
      console.error('백엔드에서 accessToken 또는 refreshToken을 받지 못함:', backendData);
      return NextResponse.json({ error: '토큰 발급 실패' }, { status: 500 });
    }

    const response = NextResponse.json({
      ok: true,
      data: {
        accessToken: userAccessToken,
      },
    });

    if (decodeDto && decodeDto.picture) {
      response.cookies.set('pictrue', decodeDto.picture, {
        sameSite: 'strict',
        path: '/',
      });
    }

    response.cookies.set('accessToken', userAccessToken, {
      httpOnly: true,
      secure: true, // HTTPS 환경에서만 전송
      sameSite: 'strict',
      path: '/',
    });

    response.cookies.set('refreshToken', userRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('카카오 로그인 처리 중 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
