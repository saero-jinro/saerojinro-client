import { NextResponse } from 'next/server';
import testJSON from '@/dummyData/lecture-list/getLectureList.json';
export type ApiResponse<T> = {
  ok: boolean;
  data?: T;
  error?: string;
};

// 예시 텍스트 에디터 데이터 파일

export const GET = async (): Promise<NextResponse> => {
  try {
    if (!testJSON) {
      throw new Error('테스트 파일이 없어요.');
    }

    const response: ApiResponse<string> = {
      ok: true,
      data: JSON.stringify(testJSON),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('API 호출 실패', error);

    const errorResponse: ApiResponse<null> = {
      ok: false,
      error: error instanceof Error ? error.message : '알 수 없는 에러',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
};
