import { Theme } from '@/_types/Header/Header.type';
import { cookies } from 'next/headers';

// 쿠키에서 테마값 추출
export const getTheme = async (): Promise<Theme> => {
  const cookieStore = await cookies();
  return cookieStore.get('theme')?.value === 'dark' ? 'dark' : 'light';
};

export default getTheme;
