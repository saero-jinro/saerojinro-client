'use client';

// 로그인 훅
const useLogin = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const loginWithKakao = (prevPath: string) => {
    if (typeof window === 'undefined' || !window.Kakao) {
      console.error('Kakao SDK 로드 실패');

      // 카카오 SDK 로드 실패 시 리로딩
      window.location.reload();
      return;
    }

    const redirectUri = `${BASE_URL}/auth`;
    sessionStorage.setItem('prevUrl', prevPath);

    window.Kakao.Auth.authorize({
      redirectUri,
      scope: 'openid profile_nickname profile_image account_email',
    });
  };

  return { loginWithKakao };
};

export default useLogin;
