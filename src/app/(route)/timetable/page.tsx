'use client';

import { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import timetableRes from '@/dummyData/timetable/getTimetable.json';
import timeWishRes from '@/dummyData/timetable/getTimeWish.json';
import timeRecommandRes from '@/dummyData/timetable/getTimetableRecommand.json';
import DayTab from '@/_components/DayTab/DayTab';

interface LectureProps {
  reservationId: number;
  userId: number;
  lectureId: number;
  title: string;
  startTime: string;
  endTime: string;
  currentReservation: number;
  capacity: number;
  location: string;
  speakerName: string;
  day?: number;
}

interface WishLectureProps {
  wishlistId: number;
  userId: number;
  lectureId: number;
  title: string;
  startTime: string;
  endTime: string;
  currentReservation: number;
  capacity: number;
  location: string;
  speakerName: string;
}

interface RecommandLectureProps {
  id: number;
  title: string;
  category: string;
  startTime: string;
  endTime: string;
  speakerName: string;
  speakerImageUri: string;
  location?: string;
}

interface TimeWishProps {
  category: string;
  thumbnailUri: string;
  title: string;
  contents: string;
  speakerName: string;
  startTime: string;
  endTime: string;
  location: string;
}

const TimetablePage = () => {
  const [userLectures, setUserLectures] = useState<{
    reservation: LectureProps[];
    wishlist: WishLectureProps[];
  }>({
    reservation: [],
    wishlist: [],
  });
  const [selectedDay, setSelectedDay] = useState<string>('Day1');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [recommandLectures, setRecommandLectures] = useState<RecommandLectureProps[]>([]);
  const [baseDate, setBaseDate] = useState<Date | null>(null);
  const [timeWish, setTimeWish] = useState<TimeWishProps[]>([]);
  const [showWishlist, setShowWishlist] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // 임시로 항상 true

  const router = useRouter();

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        // const response = await fetch('/api/timetables/me');
        // if (!response.ok) {
        //   throw new Error('네트워크 응답 오류');
        // }
        // const data = await response.json();
        const data = timetableRes;
        setUserLectures({ reservation: data.reservation, wishlist: data.wishlist });

        if (data.reservation.length > 0) {
          const minStartTime = Math.min(
            ...data.reservation.map((lec: LectureProps) => new Date(lec.startTime).getTime()),
          );
          const calculatedBaseDate = new Date(minStartTime);
          calculatedBaseDate.setHours(0, 0, 0, 0);
          setBaseDate(calculatedBaseDate);

          // Day n 매핑
          const updatedReservations = data.reservation.map((lec: LectureProps) => {
            const lectureDate = new Date(lec.startTime);
            lectureDate.setHours(0, 0, 0, 0);

            const dayDiff = Math.floor(
              (lectureDate.getTime() - calculatedBaseDate.getTime()) / (1000 * 60 * 60 * 24),
            );

            return { ...lec, day: dayDiff + 1 };
          });
          setUserLectures({ reservation: updatedReservations, wishlist: data.wishlist });
        }
      } catch (error) {
        console.error('데이터 불러오기 실패: ', error);
      }
    };
    fetchTimetable();
  }, []);

  const fetchTimeWish = async (startTime: string) => {
    try {
      // const response = await fetch(`/api/wishlist/lectures?startTime=${startTime}`);
      // if (!response.ok) throw new Error('즐겨찾기 강의 데이터를 불러오는 데 실패했습니다.');

      // const data = await response.json();
      const data = timeWishRes;
      setTimeWish(data.responses);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTimeRecommand = async (startTime: string) => {
    try {
      // const response = await fetch(`/api/lectures/recommendations?startTime=${startTime}`);
      // if (!response.ok) throw new Error('추천 강의 데이터를 불러오는 데 실패했습니다.');

      // const data = await response.json();
      const data = timeRecommandRes;
      setRecommandLectures(data.lectures);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmptySlotClick = (day: number, start: string) => {
    if (!baseDate) return;

    setShowWishlist(false);
    setSelectedTime(`Day${day} ${start}`);

    const selectedDate = new Date(baseDate);
    selectedDate.setDate(baseDate.getDate() + (day - 1));
    selectedDate.setHours(Number(start.split(':')[0]), 0, 0, 0);

    const startTimeISO = selectedDate.toISOString();
    fetchTimeWish(startTimeISO);
    fetchTimeRecommand(startTimeISO);
  };

  const filteredLectures = userLectures.reservation.filter(
    (lecture) => `Day${lecture.day}` === selectedDay,
  );

  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 9;
    return {
      start: `${String(hour).padStart(2, '0')}:00`,
      end: `${String(hour + 1).padStart(2, '0')}:00`,
    };
  });

  const occupiedSlots = new Set();

  const handleWishlistClick = () => {
    setSelectedTime(null);
    setShowWishlist((prev) => !prev);
  };

  return (
    <div className="p-10">
      <div className="w-full flex justify-between items-center py-4">
        <h1 className="text-xl font-bold">컴퍼런스 일정 시간표</h1>
        {isLoggedIn ? (
          <button className="bg-gray-200 px-1 cursor-pointer" onClick={handleWishlistClick}>
            즐찾
          </button>
        ) : (
          <div></div>
        )}
      </div>
      <div className="flex gap-2 w-full">
        <div className="flex-2">
          <DayTab
            days={['Day1', 'Day2', 'Day3']}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />
          {isLoggedIn ? (
            <div
              className="grid border border-gray-300"
              style={{ gridTemplateColumns: '140px 1fr' }}
            >
              {timeSlots.map(({ start, end }) => {
                if (occupiedSlots.has(start)) {
                  return (
                    <div
                      key={`empty-${start}`}
                      className="flex justify-center items-center border border-gray-300 bg-gray-100 p-3 h-full text-center font-medium"
                    >
                      {start} ~ {end}
                    </div>
                  );
                }

                const lecture = filteredLectures.find(
                  (lecture) =>
                    new Date(lecture.startTime).toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    }) === start,
                );

                const rowSpan = lecture
                  ? (new Date(lecture.endTime).getTime() - new Date(lecture.startTime).getTime()) /
                    (60 * 60 * 1000)
                  : 1;

                if (lecture) {
                  const occupiedTime = new Date(lecture.startTime);
                  for (let i = 0; i < rowSpan; i++) {
                    const timeKey = occupiedTime.toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    });
                    occupiedSlots.add(timeKey);
                    occupiedTime.setHours(occupiedTime.getHours() + 1);
                  }
                }

                return (
                  <Fragment key={`time-${start}-${end}`}>
                    <div className="flex justify-center items-center border border-gray-300 bg-gray-100 p-3 h-full text-center font-medium">
                      {start} ~ {end}
                    </div>

                    {lecture ? (
                      <div
                        key={lecture.reservationId}
                        className="p-4 text-left cursor-pointer"
                        style={{
                          gridRow: `span ${rowSpan}`,
                          backgroundColor: '#fff',
                          border: '1px solid #ccc',
                          borderBottom: rowSpan > 1 ? 'none' : '1px solid #ccc',
                        }}
                        onClick={() => router.push(`/lecture/${lecture.lectureId}`)}
                      >
                        <p className="w-fit bg-gray-200 px-1">{lecture.location}</p>
                        <p>{lecture.title}</p>
                        <div className="flex justify-between">
                          <p>{lecture.speakerName}</p>
                          <p>
                            인원수 {lecture.currentReservation} / {lecture.capacity}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="border border-gray-300 bg-gray-50 hover:bg-gray-200 cursor-pointer"
                        style={{
                          gridRow: 'span 1',
                        }}
                        onClick={() =>
                          handleEmptySlotClick(Number(selectedDay.replace('Day', '')), start)
                        }
                      />
                    )}
                  </Fragment>
                );
              })}
            </div>
          ) : (
            <div className="flex justify-center items-center h-[690px] bg-gray-100">
              로그인 이후 이용 가능합니다.
            </div>
          )}
        </div>

        {selectedTime && (
          <div className="flex-1 p-4 bg-gray-50 h-screen dark:bg-gray-900">
            <h3 className=" text-md font-semibold">즐찾 목록</h3>
            <div className="h-1/3 overflow-auto">
              <ul className="mt-2 border">
                {timeWish.map((lecture, index) => (
                  <li key={index} className="p-2 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <p className="bg-gray-200 w-fit px-2 dark:bg-gray-600">{lecture.location}</p>
                      <span className="text-xs">
                        {new Date(lecture?.startTime).toLocaleTimeString('ko-KR', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        })}{' '}
                        -{' '}
                        {new Date(lecture?.endTime).toLocaleTimeString('ko-KR', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        })}
                      </span>
                    </div>
                    <span>{lecture?.title}</span>
                    <div className="flex justify-between w-full">
                      <p>{lecture.speakerName}</p>
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
                {recommandLectures.map((lecture) => (
                  <li key={lecture.id} className="p-2 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <p className="bg-gray-200 w-fit px-2 dark:bg-gray-600">{lecture.location}</p>
                      <span className="text-xs">
                        {new Date(lecture?.startTime).toLocaleTimeString('ko-KR', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        })}{' '}
                        -{' '}
                        {new Date(lecture?.endTime).toLocaleTimeString('ko-KR', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        })}
                      </span>
                    </div>
                    <span>{lecture?.title}</span>
                    <div className="flex justify-between w-full">
                      <p>{lecture.speakerName}</p>
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

        {showWishlist && (
          <div className="flex-1 p-4 bg-gray-50 h-screen dark:bg-gray-900">
            <h3 className="text-md font-semibold">즐겨찾기 목록</h3>
            <div className="h-full overflow-auto">
              <ul className="mt-2 border">
                {userLectures.wishlist.length > 0 ? (
                  userLectures.wishlist.map((lecture) => (
                    <li key={lecture.wishlistId} className="p-2 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <p className="bg-gray-200 text-sm w-fit px-2 dark:bg-gray-600">
                          {lecture.location}
                        </p>
                        <span className="text-xs">
                          {new Date(lecture?.startTime).toLocaleTimeString('ko-KR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                          })}{' '}
                          -{' '}
                          {new Date(lecture?.endTime).toLocaleTimeString('ko-KR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                          })}
                        </span>
                      </div>
                      <span>{lecture?.title}</span>
                      <div className="flex justify-between w-full">
                        <p>{lecture.speakerName}</p>
                        <button className="bg-gray-600 text-white p-1 text-xs dark:bg-gray-500 cursor-pointer">
                          강의 신청
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-center p-4">즐겨찾기한 강의가 없습니다.</p>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimetablePage;
