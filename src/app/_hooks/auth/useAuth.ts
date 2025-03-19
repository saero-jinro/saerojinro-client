import { ApiResponse, AuthRefreshResponse } from '@/_types/Auth/auth.type';
import useAuthStore from '@/_store/auth/useAuth';
import { useEffect, useState } from 'react';
// import getUserInfo from '@/_utils/Auth/userinfo';

type ApiAuthRefreshResponse = ApiResponse<AuthRefreshResponse>;

const useAuth = () => {
  const accessToken = useAuthStore((store) => store.state.accessToken);
  const setAuth = useAuthStore((store) => store.actions.setAuth);
  const role = useAuthStore((store) => store.state.role);
  const [name, setName] = useState<string>('로그인');

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  //  토큰 재발급 및 역할 설정
  useEffect(() => {
    if (accessToken !== null) return;

    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/auth/user/refresh`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) return;

        const dto = (await res.json()) as ApiAuthRefreshResponse;

        if (!dto.ok || !dto.data) return;

        const { accessToken, role } = dto.data;
        setAuth(accessToken, role);
      } catch (err: unknown) {
        console.error('Refresh Token 요청 중 오류 발생:', err);
      }
    })();
  }, []);

  // 헤더에 보이는 이름 설정
  useEffect(() => {
    if (!accessToken) {
      setName((prev) => (prev !== '로그인' ? '로그인' : prev));
      return;
    }

    if (role === 'admin') {
      setName((prev) => (prev !== 'admin' ? 'admin' : prev));
      return;
    }

    setName('김지훈');

    // (async () => {
    //   const a = await getUserInfo();
    //   console.log(a)
    //   // try {
    //   //   const res = await getUserInfo(accessToken);

    //   //   if (res.ok && res.data) {
    //   //     setName(res.data.name);
    //   //   } else {
    //   //     console.error("유저 정보 가져오기 실패:", res.error);
    //   //   }
    //   // } catch (error) {
    //   //   console.error("유저 정보 요청 중 오류 발생:", error);
    //   // }
    // })();
  }, [accessToken, role, setName]);

  return { accessToken, name };
};

export default useAuth;
