'use client';

import { useState } from 'react';
import priorityData from '@/dummyData/priority/getPriortiy.json'; // JSON 데이터 import

// 데이터 타입 정의
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
}

const AdminDashboard = () => {
  const [showHighRank, setShowHighRank] = useState(true); // 상위/하위 토글 상태

  // 강의 데이터 (상위 10개 또는 하위 10개)
  const highRankLectures: Lecture[] = priorityData.lectureHighRank.slice(0, 10); // 상위 10개
  const lowRankLectures: Lecture[] = priorityData.lectureLowRank.slice(0, 10); // 하위 10개

  const lectures = showHighRank ? highRankLectures : lowRankLectures;

  // 참가자가 많은 날짜 10개
  const timeRank: TimeRank[] = priorityData.timeRank.slice(0, 10);

  // 상위/하위 데이터 토글
  const toggleRank = () => {
    setShowHighRank((prev) => !prev);
  };

  return (
    <div className="p-6 space-y-8">
      {/* 인기 강의 순위 (상위/하위 토글) */}
      <div className="border border-gray-300 p-4 rounded-md">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">📌 관심 강의 데이터</h2>
          <button
            onClick={toggleRank}
            className="border border-gray-400 px-3 py-1 rounded text-sm hover:bg-gray-200"
          >
            {showHighRank ? '관심도 낮은 순' : '관심도 높은 순'}
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border border-gray-300 p-2">순위</th>
              <th className="border border-gray-300 p-2">강의명</th>
              <th className="border border-gray-300 p-2">강연자</th>
              <th className="border border-gray-300 p-2">강의 신청한 참가자수</th>
              <th className="border border-gray-300 p-2">찜한 참가자 수</th>
            </tr>
          </thead>
          <tbody>
            {lectures.map((lecture, index) => (
              <tr key={lecture.lectureId} className="text-left">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{lecture.title}</td>
                <td className="border border-gray-300 p-2">{lecture.speaker}</td>
                <td className="border border-gray-300 p-2">{lecture.reservation}</td>
                <td className="border border-gray-300 p-2">{lecture.wishlist}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 참가자가 많은 날짜 데이터 */}
      <div className="border border-gray-300 p-4 rounded-md">
        <h2 className="text-lg font-bold mb-3">📅 참가자가 많은 날짜 데이터</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border border-gray-300 p-2">순위</th>
              <th className="border border-gray-300 p-2">날짜</th>
              <th className="border border-gray-300 p-2">시간</th>
            </tr>
          </thead>
          <tbody>
            {timeRank.map((time, index) => (
              <tr key={index} className="text-left">
                <td className="border border-gray-300 p-2">{time.rank}</td>
                <td className="border border-gray-300 p-2">{time.day}</td>
                <td className="border border-gray-300 p-2">{time.startTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
