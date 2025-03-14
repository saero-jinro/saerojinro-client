'use client';

import { useEffect, useState } from 'react';
import response from '@/dummyData/lecture-list/getLectureList.json';
import Card from '@/_components/Card/Card';
import DayTab from '@/_components/DayTab/DayTab';
import { groupByDay, groupByTime } from '@/_components/DayTab/groupBy';

export interface LectureListProps {
  id: number;
  title: string;
  category: string;
  start_time: string;
  end_time: string;
  speakerName: string;
  image: string;
}

const LectureListPage = () => {
  const [lectures, setLectures] = useState<LectureListProps[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('Day1');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['ALL']);

  useEffect(() => {
    // const fetchLectures = async () => {
    //   try {
    //     const response = await fetch('/api/lecture');
    //     if (!response.ok) {
    //       throw new Error('네트워크 응답 오류');
    //     }
    //     const lectureList: { data: { lectures: LectureListProps[] } } = await response.json();
    //     setLectures(lectureList.data.lectures);
    //   } catch (error) {
    //     console.error('데이터 불러오기 실패: ', error);
    //   }
    // };

    // fetchLectures();
    if (response && response.data && Array.isArray(response.data.lectures)) {
      setLectures(response.data.lectures);
    } else {
      console.error('데이터 구조가 예상과 다릅니다:', response);
    }
  }, []);

  const groupedByDay = groupByDay(lectures);
  const days = Object.keys(groupedByDay);
  const groupedByTime = selectedDay ? groupByTime(groupedByDay[selectedDay] || []) : {};

  const filteredLectures = selectedCategories.includes('ALL')
    ? groupedByTime
    : Object.fromEntries(
        Object.entries(groupedByTime).map(([time, lectures]) => [
          time,
          lectures.filter((lecture) => selectedCategories.includes(lecture.category)),
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
    <div className="p-10">
      <DayTab days={days} selectedDay={selectedDay} onSelectDay={setSelectedDay} />
      <div className="relative flex justify-between">
        <h1 className="text-2xl font-bold mb-6">{lectures.length} Sessions</h1>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="bg-red-300 text-white px-4 py-2 mb-4 dark:bg-neutral-800"
        >
          Filter
        </button>

        {isFilterOpen && (
          <div className="absolute top-10 right-0 z-10">
            <div className="bg-red-200 p-6 w-72 dark:bg-neutral-800">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-l font-bold">카테고리</h2>
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
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes('ALL')}
                    onChange={() => setSelectedCategories(['ALL'])}
                    className="mr-2"
                  />
                  ALL
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
                      className="mr-2"
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
        {sortedTime.map((time) => (
          <div key={time}>
            <h2 className="text-xl font-semibold mb-4">{time}</h2>
            <ul className="flex flex-wrap gap-4">
              {filteredLectures[time].map((lecture) => (
                <Card
                  key={lecture.id}
                  id={lecture.id}
                  image={lecture.image}
                  title={lecture.title}
                  category={lecture.category}
                  time={`${formatTime(lecture.start_time)} ~ ${formatTime(lecture.end_time)}`}
                  speakerName={lecture.speakerName}
                  isProfile={false}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LectureListPage;
