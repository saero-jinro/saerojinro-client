'use client';

import { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import DayTab from '@/_components/DayTab/DayTab';
import { TimeWishProps, RecommandLectureProps } from '@/_types/Timetable/Lecture.type';
import ListCard from './timetableComponent/ListCard';
import { useTimetableStore } from '@/_store/timetable/useTimetableStore';
import useAuthStore from '@/_store/auth/useAuth';
import WishlistCloseSvg from '@/assets/Timetable/bookmarkDouble-stroke.svg';
import WishlistOpenSvg from '@/assets/Timetable/bookmarkDouble-fill.svg';

const TimetablePage = () => {
  const [selectedDay, setSelectedDay] = useState<string>('Day1');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [recommandLectures, setRecommandLectures] = useState<RecommandLectureProps[]>([]);
  const [timeWish, setTimeWish] = useState<TimeWishProps[]>([]);
  const [showWishlist, setShowWishlist] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { reservation, wishlist, fetchTimetable, baseDate } = useTimetableStore();
  const accessToken = useAuthStore((store) => store.state.accessToken);

  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

  useEffect(() => {
    fetchTimetable();
    setIsLoggedIn(!!accessToken);
  }, [accessToken]);

  const fetchTimeWish = async (startTime: string) => {
    try {
      const url = `${BASE_URL}/api/wishlist/lectures?startTime=${startTime}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('즐겨찾기 강의 데이터를 불러오는 데 실패했습니다.');

      const data = await response.json();
      setTimeWish(data?.responses || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTimeRecommand = async (startTime: string) => {
    try {
      const url = `${BASE_URL}/api/lectures/recommendations?startTime=${startTime}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('추천 강의 데이터를 불러오는 데 실패했습니다.');

      const data = await response.json();
      setRecommandLectures(data?.responses || []);
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

    const pad = (n: number) => String(n).padStart(2, '0');

    const startTimeISO = `${selectedDate.getFullYear()}-${pad(selectedDate.getMonth() + 1)}-${pad(
      selectedDate.getDate(),
    )}T${pad(selectedDate.getHours())}:${pad(selectedDate.getMinutes())}:${pad(
      selectedDate.getSeconds(),
    )}`;
    fetchTimeWish(startTimeISO);
    fetchTimeRecommand(startTimeISO);
  };

  const filteredLectures = reservation.filter((lecture) => `Day${lecture.day}` === selectedDay);

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
    <div className="pt-16 px-10">
      <div className="w-full flex justify-between items-center pb-10">
        <h1 className="text-[32px] font-bold">컨퍼런스 시간표</h1>
        {isLoggedIn ? (
          <button className="cursor-pointer" onClick={handleWishlistClick}>
            {showWishlist || selectedTime ? <WishlistOpenSvg /> : <WishlistCloseSvg />}
          </button>
        ) : (
          <div></div>
        )}
      </div>
      <div className="flex gap-8 w-full ">
        <div className="flex-grow">
          <div className="pb-8">
            <DayTab
              days={['Day1', 'Day2', 'Day3']}
              selectedDay={selectedDay}
              onSelectDay={setSelectedDay}
            />
          </div>
          {isLoggedIn ? (
            <div
              className="grid border border-[#E2E8F0]"
              style={{ gridTemplateColumns: '100px 1fr' }}
            >
              {timeSlots.map(({ start, end }) => {
                const currentSlotKey = `${selectedDay} ${start}`;
                const isSelected = selectedTime === currentSlotKey;

                if (occupiedSlots.has(start) && !isSelected) {
                  return (
                    <div
                      key={`empty-${start}`}
                      className="flex justify-center items-center border border-[#E2E8F0] px-5 py-6 h-full text-center font-semibold text-base leading-[140%] text-[#757575]"
                    >
                      {start}
                      <br />-<br />
                      {end}
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

                const bgColor = (() => {
                  if (lecture) return 'bg-white';
                  if (isSelected) return 'bg-[#E6EFFF]';
                  return 'bg-[#F1F5F9]';
                })();

                return (
                  <Fragment key={`time-${start}-${end}`}>
                    <div
                      className={`flex justify-center items-center border px-5 py-6 h-full text-center font-semibold text-base leading-[140%] ${bgColor} 
                        ${isSelected ? 'border-r-0 border-[#015AFF] text-[#2F78FF]' : 'border-[#E2E8F0] text-[#757575]'}`}
                    >
                      {start}
                      <br />-<br />
                      {end}
                    </div>

                    {lecture ? (
                      <div
                        key={lecture.reservationId}
                        className="flex flex-col justify-center p-6 cursor-pointer"
                        style={{
                          gridRow: `span ${rowSpan}`,
                          backgroundColor: '#fff',
                          border: '1px solid #E2E8F0',
                          borderBottom: rowSpan > 1 ? 'none' : '1px solid #E2E8F0',
                        }}
                        onClick={() => router.push(`/lecture/${lecture.lectureId}`)}
                      >
                        <p className="w-fit rounded-sm bg-[#F1F5F9] text-[#015AFF] px-2 py-1 font-semibold text-sm leading-[140%]">
                          {lecture.location}
                        </p>
                        <p className="font-semibold text-xl leading-[140%] pt-2 pb-3">
                          {lecture.title}
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="font-medium text-lg leading-[140%]">
                            {lecture.speakerName}
                          </p>
                          <p className="px-3 py-[9px] text-[#757575] font-medium text-sm">
                            인원수{' '}
                            <span className="text-[#FF6467]">{lecture.currentReservation}</span> /{' '}
                            {lecture.capacity}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`flex justify-center items-center border font-medium text-lg cursor-pointer 
                        ${isSelected ? 'border-[#015AFF] text-[#2F78FF] bg-[#E6EFFF]' : 'border-[#E2E8F0] text-[#BDBDBD] bg-[#F1F5F9]'}
                        hover:text-[#2F78FF] hover:bg-[#E6EFFF]
                        `}
                        style={{
                          gridRow: 'span 1',
                        }}
                        onClick={() =>
                          handleEmptySlotClick(Number(selectedDay.replace('Day', '')), start)
                        }
                      >
                        빈 시간 클릭 시 추천 일정이 나타납니다.
                      </div>
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
          <div className="w-[280px] flex-shrink-0 px-6 pt-11 h-full">
            <h3 className="font-bold text-xl leading-[140%] pb-6">즐겨찾기 목록</h3>
            <div className="h-1/3 overflow-auto">
              {timeWish.length > 0 ? (
                <ListCard lectureList={timeWish} />
              ) : (
                <p className="text-gray-500 text-sm">해당 시간에 즐겨찾기한 강의가 없습니다.</p>
              )}
            </div>
            <h3 className="pt-8 pb-6 font-bold text-xl leading-[140%]">공석 추천 목록</h3>
            <div className="h-1/2 overflow-auto">
              {recommandLectures.length > 0 ? (
                <ListCard lectureList={recommandLectures} />
              ) : (
                <p className="text-gray-500 text-sm mb-3">해당 시간에 추천 강의가 없습니다.</p>
              )}
            </div>
          </div>
        )}

        {showWishlist && (
          <div className="w-[280px] flex-shrink-0 px-6 pt-11 h-full">
            <h3 className="font-bold text-xl leading-[140%] pb-6">즐겨찾기 목록</h3>
            <div className="h-full overflow-auto">
              {wishlist.length > 0 ? (
                <ListCard lectureList={wishlist} />
              ) : (
                <p className="text-gray-500 text-sm mb-3">즐겨찾기한 강의가 없습니다.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimetablePage;
