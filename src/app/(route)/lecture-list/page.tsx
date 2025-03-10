'use client';

import { useEffect, useState } from 'react';
import response from '@/dummyData/lecture-list/getLectureList.json';
import Card from '@/_components/Card/Card';

interface LectureListProps {
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

  const groupByTime = (lectures: LectureListProps[]) => {
    return lectures.reduce(
      (acc, lecture) => {
        const date = new Date(lecture.start_time);
        const startHour = date.getHours();
        const timeRange = `${String(startHour).padStart(2, '0')}:00 ~ ${String(startHour + 1).padStart(2, '0')}:00`;

        if (!acc[timeRange]) {
          acc[timeRange] = [];
        }
        acc[timeRange].push(lecture);
        return acc;
      },
      {} as Record<string, LectureListProps[]>,
    );
  };

  const groupedLectures = groupByTime(lectures);

  const sortedTime = Object.keys(groupedLectures).sort((a, b) => {
    const getHour = (timeRange: string) => parseInt(timeRange.split(':')[0], 10);
    return getHour(a) - getHour(b);
  });

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">{lectures.length} Sessions</h1>
      <div className="space-y-8">
        {sortedTime.map((time) => (
          <div key={time}>
            <h2 className="text-xl font-semibold mb-4">{time}</h2>
            <ul className="flex flex-wrap gap-4">
              {groupedLectures[time].map((lecture) => (
                <Card
                  key={lecture.id}
                  id={lecture.id}
                  image={lecture.image}
                  title={lecture.title}
                  category={lecture.category}
                  showWish={true}
                >
                  <div className="flex items-center mt-1">
                    <div className="w-4 h-4 bg-gray-300 rounded-full mr-2"></div>
                    <p className="text-sm font-semibold">{lecture.speakerName}</p>
                  </div>
                  <button
                    className="w-full mt-2 bg-gray-700 text-white py-2 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    강의 신청하기
                  </button>
                </Card>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LectureListPage;
