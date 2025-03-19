'use client';

import { handleLogout } from '@/_utils/Auth/logout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
    <div className="w-full mt-[40px]">
      <span className="block">현재 계정에서 로그아웃합니다.</span>
      <span className="block">다시 로그인하려면 카카오 계정을 사용해 주세요</span>
      <button onClick={onLogout} disabled={loading} className="btn block px-4 py-2 mt-6 rounded-[8px]">
        로그아웃
      </button>
    </div>
  );
};

export default LogoutButton;
