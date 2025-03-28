import { create } from 'zustand';
import { LectureProps, WishLectureProps } from '@/_types/Timetable/Lecture.type';
import { authStoreGetState } from '@/_store/auth/useAuth';

interface TimetableState {
  reservation: LectureProps[];
  wishlist: WishLectureProps[];
  baseDate: Date | null;
  fetchTimetable: () => Promise<void>;
  toggleWish: (lectureId: number) => Promise<void>;
  toggleReservation: (lectureId: number, isReserved: boolean) => Promise<void>;
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

export const useTimetableStore = create<TimetableState>((set, get) => ({
  reservation: [],
  wishlist: [],
  baseDate: null,

  fetchTimetable: async () => {
    try {
      const accessToken = authStoreGetState().state.accessToken;
      if (!accessToken) {
        console.warn('로그인 이후 이용 가능합니다.');
        return;
      }

      const url = `${BASE_URL}/api/timetables/me`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('시간표 조회 실패');

      const data = await response.json();

      const { reservation, wishlist } = data;

      if (reservation.length === 0) {
        set({ reservation: [], wishlist, baseDate: new Date('2025-04-01T00:00:00') });
        return;
      }

      const minStartTime = Math.min(
        ...reservation.map((lec: LectureProps) => new Date(lec.startTime).getTime()),
      );
      const base = new Date(minStartTime);
      base.setHours(0, 0, 0, 0);

      const updatedReservation = reservation.map((lec: LectureProps) => {
        const lectureDate = new Date(lec.startTime);
        lectureDate.setHours(0, 0, 0, 0);

        const dayDiff = Math.floor(
          (lectureDate.getTime() - base.getTime()) / (1000 * 60 * 60 * 24),
        );

        return {
          ...lec,
          day: dayDiff + 1,
        };
      });

      set({
        reservation: updatedReservation,
        wishlist,
        baseDate: base,
      });
    } catch (error) {
      console.error('시간표 데이터 불러오기 실패:', error);
    }
  },

  toggleWish: async (lectureId: number) => {
    const { wishlist } = get();
    const isWished = wishlist.some((w) => w.lectureId === lectureId);
    const accessToken = authStoreGetState().state.accessToken;

    try {
      const method = isWished ? 'DELETE' : 'POST';
      const url = `${BASE_URL}/api/wishlist/lectures/${lectureId}`;
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('위시 요청 실패');

      if (isWished) {
        set({ wishlist: wishlist.filter((w) => w.lectureId !== lectureId) });
      } else {
        const { fetchTimetable } = get();
        await fetchTimetable();
      }
    } catch (err) {
      console.error(`위시 ${isWished ? '삭제' : '추가'} 실패:`, err);
    }
  },

  toggleReservation: async (lectureId: number, isReserved: boolean) => {
    try {
      const accessToken = authStoreGetState().state.accessToken;
      const method = isReserved ? 'DELETE' : 'POST';
      const url = `${BASE_URL}/api/reservations/lectures/${lectureId}`;

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) throw new Error('신청/취소 실패');

      await get().fetchTimetable();
    } catch (err) {
      console.error('신청/취소 실패:', err);
    }
  },
}));
