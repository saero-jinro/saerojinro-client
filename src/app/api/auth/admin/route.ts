import { cookies } from 'next/headers';

// 발급
export const POST = async () => {
  const cookieStore = await cookies();

  cookieStore.set('admin_token', 'true', {
    httpOnly: false,
    secure: true,
    path: '/',
    maxAge: 60 * 5,
  });

  return new Response(JSON.stringify({ message: '로그인 성공' }), {
    status: 200,
  });
};

// 권한 확인
export const GET = async () => {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('admin_token');

  if (!adminToken) {
    return new Response(JSON.stringify({ admin: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ admin: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

// 권한 삭제
export const DELETE = async () => {
  const cookieStore = await cookies();

  cookieStore.delete('admin_token');

  return new Response(JSON.stringify({ message: '로그아웃 성공' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
