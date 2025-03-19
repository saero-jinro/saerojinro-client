import { ApiResponse, AuthRefreshResponse } from '@/_types/Auth/auth.type';
import useAuthStore from '@/_store/auth/useAuth';
import { useEffect } from 'react';

type ApiAuthRefreshResponse = ApiResponse<AuthRefreshResponse>;

const useAuth = () => {
  const accessToken = useAuthStore((store) => store.state.accessToken);
  const setAuth = useAuthStore((store) => store.actions.setAuth);
  const role = useAuthStore((store) => store.state.role);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

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

  useEffect(() => {
    console.log(accessToken, role);
  }, [accessToken, role]);

  return { accessToken };
};

export default useAuth;
