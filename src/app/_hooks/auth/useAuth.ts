import { ApiResponse, AuthRefreshResponse } from '@/_types/Auth/auth.type';
import { useCallback, useEffect, useState } from 'react';
import { wrapApiResponse } from '@/_utils/api/response';
import useAuthStore from '@/_store/auth/useAuth';

type ApiAuthRefreshResponse = ApiResponse<AuthRefreshResponse>;

const useAuth = () => {
  const accessToken = useAuthStore((store) => store.state.accessToken);
  const setAuth = useAuthStore((store) => store.actions.setAuth);
  const setUserInfo = useAuthStore((store) => store.actions.setUserInfo);
  const role = useAuthStore((store) => store.state.role);
  const [name, setName] = useState<string>('로그인');

  const URL = {
    refresh: process.env.NEXT_PUBLIC_BASE_URL + `/api/auth/user/refresh`,
    mypage: process.env.NEXT_PUBLIC_BACKEND_API + `/api/users/me`,
  };

  const getUserInfo = useCallback(() => {
    if (role === 'guest' || !accessToken) {
      return Promise.resolve({ ok: false, error: '토큰 없음' } as ApiResponse<{
        name: string;
        email: string;
        profileImage: string | null;
      }>);
    }

    return wrapApiResponse(
      () =>
        fetch(`${URL.mypage}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      (res) =>
        res.json().then((dto: { name: string; email: string; profileImage: string | null }) => dto),
    );
  }, [role, accessToken, URL.mypage]);

  //  토큰 재발급 및 역할 설정
  useEffect(() => {
    if (accessToken !== null) return;
    (async () => {
      try {
        const res = await fetch(`${URL.refresh}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) return;

        const dto = (await res.json()) as ApiAuthRefreshResponse;

        if (!dto.ok || !dto.data) return;

        const { accessToken, role } = dto.data;
        console.log(accessToken);

        setAuth(accessToken, role);
      } catch (err: unknown) {
        console.error('Refresh Token 요청 중 오류 발생:', err);
      }
    })();
  }, []);

  // 헤더에 보이는 이름 설정
  useEffect(() => {
    if (role === 'guest') {
      setUserInfo('로그인', null, null);
      return;
    }

    (async () => {
      try {
        const res = await getUserInfo();

        if (!res.data) throw new Error('유효하지 않는 데이터 입니다.');

        const dto = res.data;

        setUserInfo(dto.name, dto.email, dto.profileImage);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [role, setName, getUserInfo, setUserInfo]);

  return { accessToken, name };
};

export default useAuth;
