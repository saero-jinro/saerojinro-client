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
  fetchLectures: (date: string) => void;
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

export const useLectureStore = create<LectureStore>((set) => ({
  lecturelist: [] as LectureListProps[],

  fetchLectures: async (date: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/lectures/date?date=${date}`);
      if (!response.ok) {
        throw new Error('네트워크 응답 오류');
      }
      const data = await response.json();
      set({ lecturelist: data.lectures });
    } catch (error) {
      console.error('데이터 불러오기 실패: ', error);
    }
  },
}));
