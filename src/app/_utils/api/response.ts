import { ApiResponse } from '@/_types/Auth/auth.type';

const checkResponseStatus = async (res: Response): Promise<void> => {
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('인증 실패: 토큰이 유효하지 않음');
    } else if (res.status === 403) {
      throw new Error('권한 없음');
    } else if (res.status === 404) {
      throw new Error('데이터를 찾을 수 없음');
    } else {
      const message = await res.text();
      throw new Error(`서버 오류 (${res.status}): ${message}`);
    }
  }
};

export const wrapApiResponse = async <T>(
  fetcher: () => Promise<Response>,
  extractor: (res: Response) => Promise<T>,
): Promise<ApiResponse<T>> => {
  try {
    const res = await fetcher();
    await checkResponseStatus(res);
    const data = await extractor(res);
    return { ok: true, data };
  } catch (error) {
    const message = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다';
    return { ok: false, error: message };
  }
};
