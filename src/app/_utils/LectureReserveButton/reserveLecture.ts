const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

export const reserveLecture = async (lectureId: number, accessToken: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/reservations/lectures/${lectureId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result = await response.json();
    console.log('서버 응답:', result);
    if (!response.ok) throw new Error('강의 신청 실패');

    console.log(`강의 신청 완료 - lectureId: ${lectureId}`);
    return result;
  } catch (error) {
    console.error(`강의 신청 실패 - lectureId: ${lectureId}`, error);
    throw error;
  }
};
