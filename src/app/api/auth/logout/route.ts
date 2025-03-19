import { ApiResponse } from '@/_types/Auth/auth.type';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json<ApiResponse<null>>(
        { ok: false, error: '쿠키에서 인증 토큰을 찾을 수 없습니다.' },
        { status: 401 },
      );
    }

    const BACK_URL = process.env.NEXT_PUBLIC_BACKEND_AUTH_API;

    // 외부 API로 로그아웃 요청 (`accessToken` 포함)
    const backendResponse = await fetch(`${BACK_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!backendResponse.ok) {
      console.error('외부 로그아웃 실패. 상태 코드:', backendResponse.status);
      return NextResponse.json<ApiResponse<null>>(
        { ok: false, error: '외부 API 로그아웃 실패' },
        { status: backendResponse.status },
      );
    }

    // 쿠키의 모든 토큰 제거
    const response = NextResponse.json<ApiResponse<null>>(
      { ok: true, data: null },
      { status: 200 },
    );

    response.cookies.set('accessToken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    });

    response.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    });

    response.cookies.set('adminToken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error('로그아웃 처리 중 오류:', error);
    return NextResponse.json<ApiResponse<null>>({ ok: false, error: '서버 오류' }, { status: 500 });
  }
}
