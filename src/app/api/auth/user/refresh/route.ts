import { ApiResponse, AuthRefreshResponse, UserRole } from '@/_types/Auth/auth.type';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const adminToken = cookieStore.get('adminToken')?.value;

  if (!refreshToken) {
    return NextResponse.json<ApiResponse<AuthRefreshResponse>>(
      { ok: false, error: 'No refreshToken found' },
      { status: 401 },
    );
  }

  try {
    const BACK_URL = process.env.NEXT_PUBLIC_BACKEND_AUTH_API;

    const backendResponse = await fetch(`${BACK_URL}/api/auth/reissue`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!backendResponse.ok) {
      return NextResponse.json<ApiResponse<AuthRefreshResponse>>(
        { ok: false, error: 'Refresh token invalid' },
        { status: 403 },
      );
    }

    let backendData;

    try {
      backendData = await backendResponse.json();
    } catch {
      return NextResponse.json<ApiResponse<AuthRefreshResponse>>(
        { ok: false, error: 'Invalid JSON response from backend' },
        { status: 500 },
      );
    }

    const { accessToken, refreshToken: newRefreshToken } = backendData;

    const role: UserRole = adminToken ? 'admin' : 'user';

    const response = NextResponse.json<ApiResponse<AuthRefreshResponse>>({
      ok: true,
      data: { role, accessToken },
    });

    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    response.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json<ApiResponse<AuthRefreshResponse>>(
      { ok: false, error: 'Server error' },
      { status: 500 },
    );
  }
}
