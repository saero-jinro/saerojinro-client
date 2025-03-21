import { create } from 'zustand';
import wishlistDataResponse from '@/dummyData/wishlist/getWishlist.json';

export interface LectureListProps {
  id: number;
  title: string;
  category: string;
  startTime: string;
  endTime: string;
  speakerName: string;
  thumbnailUri: string;
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
  fetchLectures: (date: string) => void;
  fetchWishlist: () => void;
  toggleWish: (id: number) => void;
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;
const wishlistData = wishlistDataResponse as { response: WishlistProps[] };

export const useLectureStore = create<LectureStore>((set) => ({
  lecturelist: [] as LectureListProps[],
  wishlist: new Set<number>(),

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

  toggleWish: (id: number) => {
    set((state) => {
      const newWishlist = new Set(state.wishlist);
      if (newWishlist.has(id)) {
        newWishlist.delete(id);
      } else {
        newWishlist.add(id);
      }
      return { wishlist: newWishlist };
    });

    //  try {
    //    const isWished = useLectureStore.getState().wishlist.has(id);
    //    const url = `/api/wishlist/${id}`;
    //    const method = isWished ? 'POST' : 'DELETE';

    //    const response = await fetch(url, {
    //      method,
    //      credentials: 'include',
    //    });

    //    if (!response.ok) {
    //      throw new Error(`즐겨찾기 ${isWished ? '추가' : '삭제'} 실패`);
    //    }
    //  } catch (error) {
    //    console.error('즐겨찾기 상태 변경 실패:', error);

    //    set((state) => {
    //      const rollbackWishlist = new Set(state.wishlist);
    //      if (rollbackWishlist.has(id)) {
    //        rollbackWishlist.delete(id);
    //      } else {
    //        rollbackWishlist.add(id);
    //      }
    //      return { wishlist: rollbackWishlist };
    //    });
    //  }
  },
}));
