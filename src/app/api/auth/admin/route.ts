import type { ApiResponse, AuthAdminRequest } from '../../../_types/Auth/auth.type';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password }: AuthAdminRequest = await request.json();

    if (!email || !password) {
      return NextResponse.json<ApiResponse<null>>(
        { ok: false, error: '이메일과 비밀번호를 입력하세요.' },
        { status: 400 },
      );
    }
    const BACK_URL = process.env.NEXT_PUBLIC_BACKEND_AUTH_API;

    const backendResponse = await fetch(`${BACK_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
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

    response.cookies.set('adminToken', 'admin', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

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
    console.error('Admin 로그인 중 오류:', error);
    return NextResponse.json<ApiResponse<null>>({ ok: false, error: '서버 오류' }, { status: 500 });
  }
}
