'use client';

import { handleLogout } from '@/_utils/Auth/logout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// 임시 로그아웃 페이지
const LogoutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    setLoading(true);
    const success = await handleLogout();
    if (success) {
      router.push('/');
    } else {
      alert('로그아웃 실패. 다시 시도해주세요.');
    }
    setLoading(false);
  };

  return (
    <button
      onClick={onLogout}
      disabled={loading}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      {loading ? '로그아웃 중...' : '로그아웃'}
    </button>
  );
};

export default LogoutButton;
