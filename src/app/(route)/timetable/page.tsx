'use client';

import { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import response from '@/dummyData/timetable/getTimetable.json';

interface LectureProps {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  day?: number;
  location: string;
  speaker: string;
  count: number;
  total: number;
}

interface UserLectures {
  reservation: LectureProps[];
  wishlist: LectureProps[];
}

const TimetablePage = () => {
  const [userLectures, setUserLectures] = useState<UserLectures>({ reservation: [], wishlist: [] });
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
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

    const userReservations = response.reservation.filter(
      (lecture) => lecture.user_id === currentUserId,
    );
    const userWishlist = response.wishlist.filter((lecture) => lecture.user_id === currentUserId);

    // Day 1
    const baseDate = new Date(
      Math.min(...userReservations.map((lec) => new Date(lec.start_time).getTime())),
    );
    baseDate.setHours(0, 0, 0, 0);

    // Day n 매핑
    const updatedReservations = userReservations.map((lec) => {
      const lectureDate = new Date(lec.start_time);
      lectureDate.setHours(0, 0, 0, 0);

      const dayDiff = Math.floor(
        (lectureDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      return { ...lec, day: dayDiff + 1 };
    });

    //     setUserLectures({ reservation: userReservations, wishlist: userWishlist });
    //   } catch (error) {
    //     console.error('데이터 불러오기 실패: ', error);
    //   }
    // };

    // fetchUserLectures();

    setUserLectures({ reservation: updatedReservations, wishlist: userWishlist });
  }, []);

  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 9;
    return {
      start: `${String(hour).padStart(2, '0')}:00`,
      end: `${String(hour + 1).padStart(2, '0')}:00`,
    };
  });

  const occupiedSlots = new Set();

  return (
    <div className="flex gap-4">
      <div className="flex-2 p-10">
        <h1
          className={`text-xl font-bold mb-4 transition-all ${
            selectedTime ? 'text-left' : 'text-center w-full'
          }`}
        >
          컴퍼런스 일정 시간표
        </h1>

        <div
          className="grid border border-gray-300"
          style={{ gridTemplateColumns: '140px repeat(3, 1fr)' }}
        >
          <div className="border border-gray-300 p-3 font-bold text-center">Time</div>
          <div className="border border-gray-300 p-3 font-bold text-center">Day1</div>
          <div className="border border-gray-300 p-3 font-bold text-center">Day2</div>
          <div className="border border-gray-300 p-3 font-bold text-center">Day3</div>

          {timeSlots.map(({ start, end }, i) => (
            <Fragment key={`time-${start}-${end}`}>
              <div className="flex justify-center items-center border border-gray-300 bg-gray-100 dark:bg-gray-600 p-3 text-center font-medium">
                {start} ~ {end}
              </div>

              {Array.from({ length: 3 }, (_, j) => {
                const day = j + 1;

                // 이미 배치된 강의는 렌더링 x
                if (occupiedSlots.has(`${day}-${start}`)) {
                  return null;
                }

                const lecture = userLectures.reservation.find((lec) => {
                  const formattedStartTime = new Date(lec.start_time).toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  });
                  const formattedEndTime = new Date(lec.end_time).toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  });

                  return lec.day === day && formattedStartTime <= start && formattedEndTime > start;
                });

                if (lecture) {
                  const rowSpan =
                    (new Date(lecture.end_time).getTime() -
                      new Date(lecture.start_time).getTime()) /
                    (60 * 60 * 1000);

                  for (let k = 0; k < rowSpan; k++) {
                    const occupiedTime = new Date(
                      new Date(lecture.start_time).getTime() + k * 60 * 60 * 1000,
                    ).toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    });
                    occupiedSlots.add(`${day}-${occupiedTime}`);
                  }

                  return (
                    <div
                      key={`day-${day}-time-${start}`}
                      className="flex flex-col justify-center gap-2 border border-gray-300 p-4 cursor-pointer"
                      style={{ gridRow: `span ${rowSpan}` }}
                      onClick={() => router.push(`/lecture/${lecture?.id}`)} // 강의 상세 모달로 변경하기
                    >
                      <p className="bg-gray-200 w-fit px-2 dark:bg-gray-600">{lecture.location}</p>
                      <span>{lecture?.title}</span>
                      <div className="flex justify-between w-full">
                        <p>{lecture.speaker}</p>
                        <p>
                          인원수 {lecture.count} / {lecture.total}
                        </p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={`day-${day}-time-${start}`}
                      className="border border-gray-300 p-3 bg-gray-100 dark:bg-gray-600 hover:bg-gray-300"
                      onClick={() => {
                        setSelectedTime(`Day${day} ${start}`);
                        console.log(selectedTime);
                      }}
                    />
                  );
                }
              })}
            </Fragment>
          ))}
        </div>
      </div>

      {selectedTime && (
        <div className="flex-1 p-4 pt-10 bg-gray-50 h-screen dark:bg-gray-900">
          <h3 className=" text-md font-semibold">즐찾 목록</h3>
          <div className="h-1/3 overflow-auto">
            <ul className="mt-2 border">
              {userLectures.wishlist.map((lecture) => (
                <li key={lecture.id} className="p-2 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <p className="bg-gray-200 w-fit px-2 dark:bg-gray-600">{lecture.location}</p>
                    <span className="text-xs">
                      {new Date(lecture?.start_time).toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })}{' '}
                      -{' '}
                      {new Date(lecture?.end_time).toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })}
                    </span>
                  </div>
                  <span>{lecture?.title}</span>
                  <div className="flex justify-between w-full">
                    <p>{lecture.speaker}</p>
                    <button className="bg-gray-600 text-white p-1 text-xs dark:bg-gray-500 cursor-pointer">
                      강의 신청
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <h3 className="pt-10 text-md font-semibold">공석 추천 목록</h3>
          <div className="h-1/2 overflow-auto">
            <ul className="mt-2 border">
              {/* 추천 강의로 바꾸기 */}
              {userLectures.wishlist.map((lecture) => (
                <li key={lecture.id} className="p-2 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <p className="bg-gray-200 w-fit px-2 dark:bg-gray-600">{lecture.location}</p>
                    <span className="text-xs">
                      {new Date(lecture?.start_time).toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })}{' '}
                      -{' '}
                      {new Date(lecture?.end_time).toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })}
                    </span>
                  </div>
                  <span>{lecture?.title}</span>
                  <div className="flex justify-between w-full">
                    <p>{lecture.speaker}</p>
                    <button className="bg-gray-600 text-white p-1 text-xs dark:bg-gray-500 cursor-pointer">
                      강의 신청
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimetablePage;
