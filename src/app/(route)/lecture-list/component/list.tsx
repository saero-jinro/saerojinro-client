'use client';

import { useCallback, useEffect, useState } from 'react';
import { LectureListProps, useLectureStore } from '@/_store/LectureList/useLectureStore';
import Card from '@/_components/Card/Card';
import DayTab from '@/_components/DayTab/DayTab';
import { groupByDay, groupByTime } from '@/_components/DayTab/groupBy';
import { useTimetableStore } from '@/_store/timetable/useTimetableStore';
import FilterSvg from '@/assets/LectureList/filter.svg';
import XSvg from '@/assets/LectureList/X.svg';
import ResetSvg from '@/assets/LectureList/arrow.svg';

import { useRouter, useSearchParams } from 'next/navigation';
import useAuthStore from '@/_store/auth/useAuth';

const LectureListPage = ({
  initDay,
  initCategories,
}: {
  initDay: string;
  initCategories?: string[];
}) => {
  const { lecturelist, fetchLectures } = useLectureStore();
  const { wishlist, reservation } = useTimetableStore();
  const [selectedDay, setSelectedDay] = useState<string>(initDay);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initCategories ?? ['ALL']);

  /** zustand */
  const accessToken = useAuthStore((store) => store.state.accessToken);
  const role = useAuthStore((store) => store.state.role);
  const { fetchTimetable } = useTimetableStore();

  /** timetable ynchronization */
  useEffect(() => {
    if (accessToken || role === 'user') fetchTimetable();
  }, [accessToken, role, fetchTimetable]);

  const dateList = ['2025-04-01', '2025-04-02', '2025-04-03'];
  const dateToDayMap = dateList.reduce(
    (acc, date, index) => {
      acc[date] = `Day${index + 1}`;
      return acc;
    },
    {} as Record<string, string>,
  );

  const dayToDateMap = Object.fromEntries(
    Object.entries(dateToDayMap).map(([date, day]) => [day, date]),
  );

  useEffect(() => {
    fetchLectures(dayToDateMap[selectedDay]);
  }, [selectedDay]);

  const searchParams = useSearchParams();
  const router = useRouter();

  const updateQueryParams = useCallback(
    (day: string, categories: string[]) => {
      const params = new URLSearchParams(searchParams.toString());

      if (day.includes('ALL')) params.delete('category');
      else params.set('category', categories.join(','));

      params.set('day', day);

      router.replace(`?${params.toString()}`);
    },
    [router],
  );

  useEffect(() => {
    updateQueryParams(selectedDay, selectedCategories);
  }, [selectedCategories, selectedDay, updateQueryParams]);

  const lectures: LectureListProps[] = lecturelist;

  const groupedByDay = groupByDay(lectures);
  const selectedDate = dayToDateMap[selectedDay];
  const groupedByTime = selectedDate ? groupByTime(groupedByDay[selectedDate] || []) : {};

  const filteredLectures: Record<string, LectureListProps[]> = selectedCategories.includes('ALL')
    ? groupedByTime
    : Object.fromEntries(
        Object.entries(groupedByTime).map(([time, lectures]) => [
          time,
          (Array.isArray(lectures) ? lectures : []).filter((lecture) =>
            selectedCategories.includes(lecture.category),
          ),
        ]),
      );

  const sortedTime = Object.keys(filteredLectures).sort((a, b) => {
    const getHour = (timeRange: string) => parseInt(timeRange.split(':')[0], 10);
    return getHour(a) - getHour(b);
  });

  function formatTime(time: string): string {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  const categories = Array.from(new Set(lectures.map((lecture) => lecture.category)));

  return (
    <div className="px-10 py-16 max-md:px-4 max-md:py-8">
      {/* <DayTab
        days={Object.values(dateToDayMap)}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
      /> */}
      <DayTab
        days={Object.values(dateToDayMap)}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
      />
      <div className="relative flex justify-between items-center h-10 mt-10 max-md:mt-5">
        <h1 className="text-lg font-medium leading-[140%] max-md:text-sm">
          <span className="text-[#015AFF] dark:text-[#014DD9]">
            {groupedByDay[selectedDate]?.length || 0}
          </span>{' '}
          lecture
        </h1>
        <button
          onClick={() => setIsFilterOpen((prev) => !prev)}
          className="p-1 w-8 h-8 max-md:w-6 max-md:h-6 flex items-center justify-center cursor-pointer"
        >
          <FilterSvg />
        </button>

        {isFilterOpen && (
          <div
            className="absolute top-10 right-0 z-10 max-md:fixed max-md:inset-0 max-md:top-16 max-md:bg-[#000000B2]"
            onClick={() => setIsFilterOpen(false)}
          >
            <div
              className="bg-[#fff] dark:bg-[#070A12] p-6 w-75 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.15)] max-md:w-screen max-md:rounded-b-sm max-md:px-4 max-md:py-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold leading-[140%] max-md:text-base">카테고리</h2>
                <div className="flex justify-end space-x-2 max-md:space-x-1">
                  <button
                    onClick={() => setSelectedCategories(['ALL'])}
                    className="w-6 h-6 p-1 cursor-pointer"
                  >
                    <ResetSvg />
                  </button>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="w-6 h-6 p-1 cursor-pointer"
                  >
                    <XSvg />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes('ALL')}
                    onChange={() => setSelectedCategories(['ALL'])}
                    className="mr-[10px] max-md:mr-2 w-5 h-5 accent-[#015AFF] dark:accent-[#003AA5]"
                  />
                  <span className="text-base font-medium leading-[140%] text-[#212121] dark:text-white">
                    ALL
                  </span>
                </label>
                {categories.map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => {
                        if (selectedCategories.includes('ALL')) {
                          setSelectedCategories([category]);
                        } else {
                          setSelectedCategories((prev) =>
                            prev.includes(category)
                              ? prev.filter((c) => c !== category)
                              : [...prev, category],
                          );
                        }
                      }}
                      className="mr-[10px] max-md:mr-2 w-5 h-5 accent-[#015AFF] dark:accent-[#003AA5]"
                    />
                    <span className="text-base font-medium leading-[140%] text-[#212121] dark:text-white">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-8  max-md:space-y-4">
        {sortedTime.length > 0 ? (
          sortedTime.map((time) => (
            <div key={time}>
              <h2 className="text-2xl font-bold mt-8 mb-4 max-md:text-lg max-md:my-4">{time}</h2>
              <ul className="flex flex-wrap gap-6 max-md:gap-3">
                {filteredLectures[time].map((lecture) => (
                  <Card
                    key={lecture.id}
                    id={lecture.id}
                    image={lecture.thumbnailUri}
                    title={lecture.title}
                    category={lecture.category}
                    time={`${formatTime(lecture.startTime)} ~ ${formatTime(lecture.endTime)}`}
                    startTime={lecture.startTime}
                    endTime={lecture.endTime}
                    speakerName={lecture.speakerName}
                    isWished={wishlist.some((w) => w.lectureId === lecture.id)}
                    isProfile={false}
                    isReserved={reservation.some((r) => r.lectureId === lecture.id)}
                  />
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg py-12">선택한 날짜에 강의가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default LectureListPage;
