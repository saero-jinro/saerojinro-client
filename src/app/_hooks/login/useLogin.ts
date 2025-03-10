'use client';

const useLogin = () => {
  const loginWithKakao = () => {
    if (typeof window === 'undefined' || !window.Kakao) {
      console.error('Kakao SDK 로드 실패');
      return;
    }
    const curURL = window.location.href;
    const redirectUri = 'http://localhost:3000/auth';

    // 이전 경로 기억
    sessionStorage.setItem('prevUrl', curURL);

    window.Kakao.Auth.authorize({
      redirectUri,
      scope: 'openid profile_nickname profile_image account_email',
    });
  };

  return { loginWithKakao };
};

export default useLogin;
