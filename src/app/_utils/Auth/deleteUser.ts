export const handleDeleteUser = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!res.ok) {
      console.error('회원탈퇴 실패:', res.status, await res.text());
      return false;
    }

    console.log('회원탈퇴 성공');
    return true;
  } catch (error) {
    console.error('로그아웃 중 오류 발생:', error);
    return false;
  }
};
