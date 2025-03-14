import { create } from 'zustand';
import lectureDataResponse from '@/dummyData/lecture-list/getLectureList.json';
import wishlistDataResponse from '@/dummyData/wishlist/getWishlist.json';

export interface LectureListProps {
  id: number;
  title: string;
  category: string;
  start_time: string;
  end_time: string;
  speakerName: string;
  image: string;
}

export interface WishlistProps {
  id: number;
  speaker: string;
  lectureTitle: string;
  startTime: string;
  endTime: string;
  location: string;
}

interface LectureStore {
  lecturelist: LectureListProps[];
  wishlist: Set<number>;
  fetchLectures: () => void;
  fetchWishlist: () => void;
}

const lectureData = lectureDataResponse as { data: { lectures: LectureListProps[] } };
const wishlistData = wishlistDataResponse as { response: WishlistProps[] };

export const useLectureStore = create<LectureStore>((set) => ({
  lecturelist: [] as LectureListProps[],
  wishlist: new Set<number>(),

  fetchLectures: () => {
    // const fetchLectures = async () => {
    //   try {
    //     const response = await fetch('/api/lectures');
    //     if (!response.ok) {
    //       throw new Error('네트워크 응답 오류');
    //     }
    //     const data = await response.json();
    //     set({ lectures: data.lectures });
    //   } catch (error) {
    //     console.error('데이터 불러오기 실패: ', error);
    //   }
    // };

    if (lectureData?.data?.lectures && Array.isArray(lectureData.data.lectures)) {
      set({ lecturelist: lectureData.data.lectures });
    } else {
      console.error('강의 목록 데이터 구조가 예상과 다릅니다:', lectureData);
    }
  },

  fetchWishlist: () => {
    // const fetchWishlist = async () => {
    //   try {
    //     const response = await fetch('/api/wishlist', { credentials: 'include' });
    //     if (!response.ok) {
    //       throw new Error('네트워크 응답 오류');
    //     }
    //     const data = await response.json();
    //     set({ wishedItems: new Set(data.response.map((item: any) => item.id)) });
    //   } catch (error) {
    //     console.error('데이터 불러오기 실패: ', error);
    //   }
    // };

    if (wishlistData?.response && Array.isArray(wishlistData.response)) {
      set({ wishlist: new Set(wishlistData.response.map((item) => item.id)) });
    } else {
      console.error('즐겨찾기 데이터 구조가 예상과 다릅니다:', wishlistData);
    }
  },
}));
