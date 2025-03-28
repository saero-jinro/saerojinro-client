export const handleLogout = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) {
      console.error('로그아웃 실패:', res.status, await res.text());
      return false;
    }

    console.log('로그아웃 성공');
    document.cookie = 'adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    return true;
  } catch (error) {
    console.error('로그아웃 중 오류 발생:', error);
    return false;
  }
};
