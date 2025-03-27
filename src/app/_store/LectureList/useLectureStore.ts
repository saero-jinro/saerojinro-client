import { create } from 'zustand';

export interface LectureListProps {
  id: number;
  title: string;
  category: string;
  startTime: string;
  endTime: string;
  speakerName: string;
  thumbnailUri: string;
}

interface LectureStore {
  lecturelist: LectureListProps[];
  prevLecturelist: Record<string, LectureListProps[]>; // 캐싱
  fetchLectures: (date: string) => void;
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

export const useLectureStore = create<LectureStore>((set, get) => ({
  lecturelist: [] as LectureListProps[],
  prevLecturelist: {},

  fetchLectures: async (date: string) => {
    const { prevLecturelist } = get();

    // 캐시가 있다면 fetch 생략
    if (prevLecturelist[date]) {
      set({ lecturelist: prevLecturelist[date] });
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/lectures/date?date=${date}`);
      if (!response.ok) {
        throw new Error('네트워크 응답 오류');
      }

      const data = await response.json();
      const lectures = data.lectures as LectureListProps[];

      // 상태 업데이트 뒤 캐시 저장
      set((state) => ({
        lecturelist: lectures,
        prevLecturelist: {
          ...state.prevLecturelist,
          [date]: lectures,
        },
      }));
    } catch (error) {
      console.error('데이터 불러오기 실패: ', error);
    }
  },
}));
