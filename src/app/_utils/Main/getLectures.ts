import { Lectures } from '@/_types/Lectures/lectures.type';

export const getLectures = async (date: string, day: number): Promise<Lectures> => {
  const BACK_URL = process.env.NEXT_PUBLIC_BACKEND_API;
  const formattedDay = day.toString().padStart(2, '0');
  const fullDate = `${date}-${formattedDay}`;
  const endpoint = `${BACK_URL}/api/lectures/date?date=${fullDate}`;

  const res = await fetch(endpoint);

  if (!res.ok) {
    throw new Error(`응답 실패: ${res.status}`);
  }

  const data = await res.json();

  if (!data.lectures) {
    throw new Error('lectures 필드가 존재하지 않습니다.');
  }

  return data.lectures as Lectures;
};
