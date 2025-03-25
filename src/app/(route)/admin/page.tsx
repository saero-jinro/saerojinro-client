'use client';

import { useState, useEffect, useMemo } from 'react';

interface Lecture {
  lectureId: number;
  rank: number;
  title: string;
  speaker: string;
  reservation: number;
  wishlist: number;
}

interface TimeRank {
  rank: number;
  day: string;
  startTime: string;
  expectation: number;
}

const AdminDashboard = () => {
  const [isLowToHigh, setIsLowToHigh] = useState(false); // 낮은순 정렬 여부
  const [lecturesRaw, setLecturesRaw] = useState<Lecture[]>([]);
  const [timeRank, setTimeRank] = useState<TimeRank[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://admin.saerojinro.site/api/dashboard');
        if (!response.ok) throw new Error('API 호출 실패');
        const data = await response.json();

        setLecturesRaw(data.lectureHighRank.concat(data.lectureLowRank)); // 전체 데이터를 한번에 받는다고 가정
        setTimeRank(data.timeRank.slice(0, 10));
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
      }
    };

    fetchData();
  }, []);

  const toggleSort = () => {
    setIsLowToHigh(prev => !prev);
  };

  const sortedLectures = useMemo(() => {
    const sorted = [...lecturesRaw].sort((a, b) =>
      isLowToHigh ? a.rank - b.rank : b.rank - a.rank
    );
    return sorted.slice(0, 10); // 상위 10개만
  }, [lecturesRaw, isLowToHigh]);

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toTimeString().slice(0, 5);
  };

  return (
    <div className="w-[1200px] mx-auto pt-[64px] pb-[64px]">
      <div className="flex gap-[24px]">
        {/* Crowd Forecast */}
        <div className="w-[384px]">
          <h1 className="text-lg font-bold mb-[12px]">Crowd Forecast</h1>
          <div className="border border-gray-300 rounded-md bg-white">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white text-left">
                  <th className="px-[16px] py-[12px]">순위</th>
                  <th className="px-[16px] py-[12px]">날짜</th>
                  <th className="px-[16px] py-[12px]">시간</th>
                  <th className="px-[16px] py-[12px] text-right">예상 인원</th>
                </tr>
              </thead>
              <tbody>
                {timeRank.map((time, index) => (
                  <tr key={index} className="border-b border-b-gray-200">
                    <td className="px-[16px] py-[8px]">{time.rank}</td>
                    <td className="px-[16px] py-[8px]">{time.day}</td>
                    <td className="px-[16px] py-[8px]">{formatTime(time.startTime)}</td>
                    <td className="px-[16px] py-[8px] text-right">{time.expectation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lecture Tracker */}
        <div className="w-[792px]">
          <div className="flex justify-between items-center mb-[12px]">
            <h1 className="text-lg font-bold">Lecture Tracker</h1>
          </div>
          <div className="border border-gray-300 rounded-md bg-white">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white text-left">
                  <th onClick={toggleSort}>
                    {isLowToHigh ? '높은 순▲' : '낮은 순▼'}
                  </th>

                  <th className="px-[16px] py-[12px]">강의명</th>
                  <th className="px-[16px] py-[12px] whitespace-nowrap">강연자</th>
                  <th className="px-[16px] py-[12px] text-right">신청한 수</th>
                  <th className="px-[16px] py-[12px] text-right">즐겨찾기 수</th>
                </tr>
              </thead>
              <tbody>
                {sortedLectures.map((lecture, index) => (
                  <tr key={lecture.lectureId} className="border-b border-b-gray-200">
                    <td className="px-[16px] py-[8px]">{lecture.rank}</td>
                    <td className="px-[16px] py-[8px]">{lecture.title}</td>
                    <td className="px-[16px] py-[8px] whitespace-nowrap">{lecture.speaker}</td>
                    <td className="px-[16px] py-[8px] text-right">{lecture.reservation}</td>
                    <td className="px-[16px] py-[8px] text-right">{lecture.wishlist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
