'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import response from '@/dummyData/timetable/getTimetable.json';

interface LectureProps {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
}

interface UserLectures {
  reservation: LectureProps[];
  wishlist: LectureProps[];
}

const TimetablePage = () => {
  const [userLectures, setUserLectures] = useState<UserLectures>({ reservation: [], wishlist: [] });
  const router = useRouter();
  const currentUserId = 222; // 현재 로그인한 유저 ID 가져오는 로직 추가

  useEffect(() => {
    // const fetchUserLectures = async () => {
    //   try {
    //     const response = await fetch(`/api/attendees/${currentUserId}/timetable`);
    //     if (!response.ok) {
    //       throw new Error('네트워크 응답 오류');
    //     }
    //     const data: UserLectures = await response.json();
    //     const userReservations = data.reservation.filter((lecture) => lecture.user_id === userId);
    //     const userWishlist = data.wishlist.filter((lecture) => lecture.user_id === userId);

    //     setUserLectures({ reservation: userReservations, wishlist: userWishlist });
    //   } catch (error) {
    //     console.error('데이터 불러오기 실패: ', error);
    //   }
    // };

    // fetchUserLectures();
    const userReservations = response.reservation.filter(
      (lecture) => lecture.user_id === currentUserId,
    );
    const userWishlist = response.wishlist.filter((lecture) => lecture.user_id === currentUserId);

    setUserLectures({ reservation: userReservations, wishlist: userWishlist });
  }, []);

  return (
    <div className="pt-10">
      <h1 className="text-xl font-bold mb-4">시간표</h1>

      <h2 className="text-lg font-semibold">예약된 강의</h2>
      <ul className="mb-6">
        {userLectures.reservation.length > 0 ? (
          userLectures.reservation.map((lecture) => (
            <li
              key={lecture.id}
              className="cursor-pointer hover:bg-gray-100 p-2 border-b"
              onClick={() => router.push(`/lecture/${lecture.id}`)}
            >
              <strong>{lecture.title}</strong>
              <br />
              {lecture.start_time} ~ {lecture.end_time}
            </li>
          ))
        ) : (
          <p className="text-gray-500">예약된 강의가 없습니다.</p>
        )}
      </ul>

      <h2 className="text-lg font-semibold">즐겨찾기 강의</h2>
      <ul>
        {userLectures.wishlist.length > 0 ? (
          userLectures.wishlist.map((lecture) => (
            <li
              key={lecture.id}
              className="cursor-pointer hover:bg-gray-100 p-2 border-b"
              onClick={() => router.push(`/lecture/${lecture.id}`)}
            >
              <strong>{lecture.title}</strong>
              <br />
              {lecture.start_time} ~ {lecture.end_time}
            </li>
          ))
        ) : (
          <p className="text-gray-500">즐겨찾기한 강의가 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default TimetablePage;
