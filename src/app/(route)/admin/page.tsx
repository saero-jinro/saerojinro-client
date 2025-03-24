'use client';

import { useState, useEffect } from 'react';

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
  reservation: number;
}

const AdminDashboard = () => {
  const [showLowRank, setShowLowRank] = useState(false);
  const [highRankLectures, setHighRankLectures] = useState<Lecture[]>([]);
  const [lowRankLectures, setLowRankLectures] = useState<Lecture[]>([]);
  const [timeRank, setTimeRank] = useState<TimeRank[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://admin.saerojinro.site/api/dashboard');
        if (!response.ok) throw new Error('API 호출 실패');
        const data = await response.json();

        setHighRankLectures(data.lectureHighRank.slice(0, 10));
        setLowRankLectures(data.lectureLowRank.slice(0, 10));
        setTimeRank(data.timeRank.slice(0, 10));
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
      }
    };

    fetchData();
  }, []);

  const lectures = showLowRank ? lowRankLectures : highRankLectures;

  const toggleRank = () => {
    setShowLowRank((prev) => !prev);
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toTimeString().slice(0, 5);
  };

  return (
    <div className="w-[1200px] mx-auto pt-[64px] pb-[64px]">
      <div className="flex gap-[24px]">
        {/* Crowd Forecast */}
        <div className="border border-gray-300 rounded-md w-[384px] bg-white">
          <h1 className="text-lg font-bold mb-[20px] px-[24px] pt-[24px]">Crowd Forecast</h1>
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
                  <td className="px-[16px] py-[8px] text-right">{time.reservation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Lecture Tracker */}
        <div className="border border-gray-300 rounded-md w-[792px] bg-white">
          <div className="flex justify-between items-center mb-[20px] px-[24px] pt-[24px]">
            <h1 className="text-lg font-bold">Lecture Tracker</h1>
            <button
              onClick={toggleRank}
              className="border border-blue-500 text-blue-500 px-[12px] py-[4px] rounded text-sm hover:bg-blue-100"
            >
              {showLowRank ? '높은 순 🔼' : '낮은 순 🔽'}
            </button>
          </div>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="px-[16px] py-[12px]">순위</th>
                <th className="px-[16px] py-[12px]">강의명</th>
                <th className="px-[16px] py-[12px] whitespace-nowrap">강연자</th>
                <th className="px-[16px] py-[12px] text-right">신청한 수</th>
                <th className="px-[16px] py-[12px] text-right">즐겨찾기 수</th>
              </tr>
            </thead>
            <tbody>
              {lectures.map((lecture, index) => (
                <tr key={lecture.lectureId} className="border-b border-b-gray-200">
                  <td className="px-[16px] py-[8px]">{index + 1}</td>
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
  );
};

export default AdminDashboard;
