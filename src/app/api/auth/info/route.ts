import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const BACK_URL = process.env.NEXT_PUBLIC_BACKEND_API;

  try {
    const cookie = await cookies();
    const accessToken = cookie.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json({ ok: false, error: '토큰이 없습니다.' }, { status: 401 });
    }
    console.log(accessToken);

    // 2. 백엔드로 유저 정보 요청
    const response = await fetch(`${BACK_URL}/user/api/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 3. 백엔드에서 204 (No Content)를 반환한 경우
    if (response.status === 204) {
      return NextResponse.json({ ok: true, data: {} }, { status: 204 });
    }

    // 3. 응답이 정상인지 확인
    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: `서버 오류 발생 (status: ${response.status})` },
        { status: response.status },
      );
    }

    // 4. 백엔드에서 받은 데이터 반환
    const data = await response.json();
    return NextResponse.json({ ok: true, data }, { status: 200 });
  } catch (error) {
    console.error('유저 정보 요청 중 오류 발생:', error);
    return NextResponse.json({ ok: false, error: '서버 내부 오류 발생' }, { status: 500 });
  }
}
