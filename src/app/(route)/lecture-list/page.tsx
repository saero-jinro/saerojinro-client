'use client';

import { useEffect, useState } from 'react';
import { LectureListProps, useLectureStore } from '@/_store/LectureList/useLectureStore';
import Card from '@/_components/Card/Card';
import DayTab from '@/_components/DayTab/DayTab';
import { groupByDay, groupByTime } from '@/_components/DayTab/groupBy';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { useTimetableStore } from '@/_store/timetable/useTimetableStore';

const LectureListPage = () => {
  const { lecturelist, fetchLectures } = useLectureStore();
  const { wishlist, reservation } = useTimetableStore();
  const [selectedDay, setSelectedDay] = useState<string>('Day1');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['ALL']);

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
    <div className="px-10 py-16">
      <DayTab
        days={Object.values(dateToDayMap)}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
      />
      <div className="relative flex justify-between items-center h-10 mt-10">
        <h1 className="text-lg font-medium leading-[140%]">
          {groupedByDay[selectedDate]?.length || 0} Sessions
        </h1>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="text-lg font-medium leading-[140%] border-1 border-gray-300 rounded-lg dark:bg-neutral-800"
        >
          <HiOutlineAdjustmentsHorizontal size={40} />
        </button>

        {isFilterOpen && (
          <div className="absolute top-10 right-0 z-10">
            <div className="bg-[#eee] p-6 w-72 dark:bg-neutral-800">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-l font-bold leading-[140%]">카테고리</h2>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setSelectedCategories(['ALL'])}
                    className="bg-white px-2 py-1 text-sm dark:bg-gray-600"
                  >
                    리셋
                  </button>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="bg-white px-2 py-1 text-sm dark:bg-gray-600"
                  >
                    닫기
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes('ALL')}
                    onChange={() => setSelectedCategories(['ALL'])}
                    className="mr-3 text-base font-semibold leading-[140%]"
                  />
                  전체
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
                      className="mr-3 text-base font-semibold leading-[140%]"
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {sortedTime.length > 0 ? (
          sortedTime.map((time) => (
            <div key={time}>
              <h2 className="text-2xl font-bold mt-8 mb-6">{time}</h2>
              <ul className="flex flex-wrap gap-6">
                {filteredLectures[time].map((lecture) => (
                  <Card
                    key={lecture.id}
                    id={lecture.id}
                    image={lecture.thumbnailUri}
                    title={lecture.title}
                    category={lecture.category}
                    time={`${formatTime(lecture.startTime)} ~ ${formatTime(lecture.endTime)}`}
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
