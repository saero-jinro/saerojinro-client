'use client';

import { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import DayTab from '@/_components/DayTab/DayTab';
import { TimeWishProps, RecommandLectureProps } from '@/_types/Timetable/Lecture.type';
import ListCard from './ListCard';
import { useTimetableStore } from '@/_store/timetable/useTimetableStore';
import useAuthStore from '@/_store/auth/useAuth';
import WishlistCloseSvg from '@/assets/Timetable/bookmarkDouble-stroke.svg';
import WishlistOpenSvg from '@/assets/Timetable/bookmarkDouble-fill.svg';
import useQueryString from '@/_hooks/queryString/useQueryString';

interface Props {
  initDay: string;
  initShowWishlist: boolean;
}

const TimetablePage = ({ initDay, initShowWishlist }: Props) => {
  const [selectedDay, setSelectedDay] = useState<string>(initDay ?? 'Day1');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [recommandLectures, setRecommandLectures] = useState<RecommandLectureProps[]>([]);
  const [timeWish, setTimeWish] = useState<TimeWishProps[]>([]);
  const [showWishlist, setShowWishlist] = useState<boolean>(initShowWishlist);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const { reservation, wishlist, fetchTimetable, baseDate } = useTimetableStore();
  const accessToken = useAuthStore((store) => store.state.accessToken);
  const { setQueryDayShowWishList } = useQueryString();

  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

  useEffect(() => {
    setQueryDayShowWishList(selectedDay, showWishlist);
  }, [selectedDay, showWishlist, setQueryDayShowWishList]);

  useEffect(() => {
    fetchTimetable();
    setIsLoggedIn(!!accessToken);
  }, [accessToken]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if ((selectedTime || showWishlist) && isMobile) {
      setShowBottomSheet(true);
    }
  }, [selectedTime, showWishlist, isMobile]);

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

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowBottomSheet(false);
      setIsClosing(false);
      setSelectedTime(null);
      setShowWishlist(false);
    }, 300);
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
    <main className="py-16 px-10 max-md:py-8 max-md:px-4">
      <header className="w-full flex justify-between items-center pb-8 max-md:pb-5">
        <h1 className="text-[#212121] dark:text-white text-[32px] font-bold max-md:text-xl">
          컨퍼런스 시간표
        </h1>
        {isLoggedIn ? (
          <button
            className="cursor-pointer p-1"
            onClick={handleWishlistClick}
            aria-label="toggle-wishlist-view"
          >
            {showWishlist || selectedTime ? (
              <WishlistOpenSvg className="w-8 h-8 max-md:w-6 max-md:h-6" />
            ) : (
              <WishlistCloseSvg className="w-8 h-8 max-md:w-6 max-md:h-6" />
            )}
          </button>
        ) : (
          <div></div>
        )}
      </header>
      <div className="flex gap-6 w-full ">
        <div className="flex-grow">
          <div className="pb-6 max-md:pb-4">
            <DayTab
              days={['Day1', 'Day2', 'Day3']}
              selectedDay={selectedDay}
              onSelectDay={setSelectedDay}
            />
          </div>
          {isLoggedIn ? (
            <section className="grid rounded-sm border border-[#E2E8F0] dark:border-[#161F2E] [grid-template-columns:100px_1fr] max-md:[grid-template-columns:75px_1fr] max-md:rounded-xs">
              {timeSlots.map(({ start, end }) => {
                const currentSlotKey = `${selectedDay} ${start}`;
                const isSelected = selectedTime === currentSlotKey;

                if (occupiedSlots.has(start) && !isSelected) {
                  return (
                    <time
                      key={`empty-${start}`}
                      className="flex justify-center items-center border border-[#E2E8F0] px-5 py-6 bg-white max-md:p-4 h-full text-center font-semibold text-base max-md:text-sm leading-[140%] text-[#757575] dark:bg-[#070A12] dark:border-[#161F2E] dark:text-[#62748E]"
                    >
                      {start}
                      <br />-<br />
                      {end}
                    </time>
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
                  if (lecture) return 'bg-white dark:bg-[#070A12]';
                  if (isSelected) return 'bg-[#E6EFFF] dark:bg-[#001046]';
                  return 'bg-[#F1F5F9] dark:bg-[#0D121E]';
                })();

                return (
                  <Fragment key={`time-${start}-${end}`}>
                    <div
                      className={`flex justify-center items-center border px-5 py-6 max-md:p-4 h-full text-center font-semibold text-base max-md:text-sm leading-[140%] ${bgColor} 
                        ${isSelected ? 'border-r-0 border-[#015AFF] text-[#2F78FF] dark:text-[#014DD9]  dark:border-[#003AA5]' : 'border-[#E2E8F0] text-[#757575] dark:border-[#161F2E] dark:text-[#62748E]'}`}
                    >
                      {start}
                      <br />-<br />
                      {end}
                    </div>

                    {lecture ? (
                      <article
                        key={lecture.reservationId}
                        className={`flex flex-col justify-center p-6 max-md:p-4 cursor-pointer bg-white dark:bg-[#070A12] border border-[#E2E8F0] dark:border-[#161F2E] ${rowSpan > 1 ? 'border-b-0' : 'border-b'}`}
                        style={{
                          gridRow: `span ${rowSpan}`,
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') router.push(`/lecture/${lecture.lectureId}`);
                        }}
                        onClick={() => router.push(`/lecture/${lecture.lectureId}`)}
                      >
                        <p className="w-fit rounded-sm bg-[#F1F5F9] text-[#015AFF] dark:bg-[#0D121E] dark:text-[#014DD9] px-2 py-1 max-md:py-0.5 font-semibold text-sm max-md:text-xs leading-[140%]">
                          {lecture.location}
                        </p>
                        <p className="font-semibold text-xl max-md:text-base leading-[140%] pt-2 pb-3 max-md:pt-1 max-md:pb-2">
                          {lecture.title}
                        </p>
                        <div className="flex justify-between items-center">
                          <p className="font-medium text-lg max-md:text-sm leading-[140%] dark:text-[#CAD5E2]">
                            {lecture.speakerName}
                          </p>
                          <p className="px-3 py-[9px] text-[#757575] dark:text-[#62748E] font-medium text-sm max-md:text-xs">
                            인원수{' '}
                            <span className="text-[#FF6467]">{lecture.currentReservation}</span> /{' '}
                            {lecture.capacity}
                          </p>
                        </div>
                      </article>
                    ) : (
                      <div
                        className={`flex justify-center items-center border font-medium text-lg max-md:text-sm cursor-pointer 
                        ${isSelected ? 'border-[#015AFF] text-[#2F78FF] bg-[#E6EFFF] dark:text-[#014DD9] dark:bg-[#001046] dark:border-[#003AA5]' : 'border-[#E2E8F0] text-[#BDBDBD] bg-[#F1F5F9] dark:bg-[#0D121E] dark:border-[#161F2E] dark:text-[#62748E]'}
                        hover:text-[#2F78FF] hover:bg-[#E6EFFF] dark:hover:text-[#0140B5] dark:hover:bg-[#001046]
                        `}
                        style={{
                          gridRow: 'span 1',
                        }}
                        onClick={() =>
                          handleEmptySlotClick(Number(selectedDay.replace('Day', '')), start)
                        }
                        aria-label="open-recommendation-lecture"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleEmptySlotClick(Number(selectedDay.replace('Day', '')), start);
                          }
                        }}
                      >
                        빈 시간 클릭 시 추천 일정이 나타납니다.
                      </div>
                    )}
                  </Fragment>
                );
              })}
            </section>
          ) : (
            <div className="flex justify-center items-center h-[690px] bg-[#F1F5F9] text-[#757575] dark:bg-[#0D121E] dark:text-[#62748E]">
              로그인 이후 이용 가능합니다.
            </div>
          )}
        </div>

        {selectedTime && !isMobile && (
          <div className="w-[280px] flex-shrink-0 px-0 pt-10 h-full">
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

        {showWishlist && !isMobile && (
          <div className="w-[280px] flex-shrink-0 px-0 pt-10 h-full">
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

        {showBottomSheet && (
          <div
            className="fixed inset-0 z-40 bg-[#000000B2]"
            onClick={handleClose}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleClose();
              }
            }}
            aria-label="close-recommendation-lecture"
            role="button"
            tabIndex={0}
          >
            <div
              className={`fixed bottom-0 left-0 w-full max-h-[70vh] bg-[#F8FAFC] dark:bg-[#02050C] rounded-t-[20px] px-4 py-6 z-50 overflow-y-auto ${isClosing ? 'animate-slide-down' : 'animate-slide-up'}`}
              aria-hidden="true"
              onClick={(e) => e.stopPropagation()}
            >
              <style jsx>{`
                @keyframes slide-up {
                  from {
                    transform: translateY(100%);
                  }
                  to {
                    transform: translateY(0);
                  }
                }

                @keyframes slide-down {
                  from {
                    transform: translateY(0);
                  }
                  to {
                    transform: translateY(100%);
                  }
                }

                .animate-slide-up {
                  animation: slide-up 0.5s ease-out forwards;
                }

                .animate-slide-down {
                  animation: slide-down 0.3s ease-in forwards;
                }
              `}</style>
              {selectedTime && (
                <>
                  <h3 className="font-bold text-lg pb-4">즐겨찾기 목록</h3>
                  {timeWish.length > 0 ? (
                    <ListCard lectureList={timeWish} />
                  ) : (
                    <p className="text-gray-500 text-sm">해당 시간에 즐겨찾기한 강의가 없습니다.</p>
                  )}
                  <h3 className="pt-6 pb-4 font-bold text-lg">공석 추천 목록</h3>
                  {recommandLectures.length > 0 ? (
                    <ListCard lectureList={recommandLectures} />
                  ) : (
                    <p className="text-gray-500 text-sm mb-3">해당 시간에 추천 강의가 없습니다.</p>
                  )}
                </>
              )}

              {showWishlist && (
                <>
                  <h3 className="font-bold text-lg pb-4">즐겨찾기 목록</h3>
                  {wishlist.length > 0 ? (
                    <ListCard lectureList={wishlist} />
                  ) : (
                    <p className="text-gray-500 text-sm mb-3">즐겨찾기한 강의가 없습니다.</p>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default TimetablePage;
