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
  reservation: number;
}

const AdminDashboard = () => {
  const [showLowRank, setShowLowRank] = useState(false); // 낮은 순 정렬 토글
  /* const [lectures, setLectures] = useState<Lecture[]>([]);
  const [lowRankLectures, setLowRankLectures] = useState<Lecture[]>([]);
  const [timeRank, setTimeRank] = useState<TimeRank[]>([]);*/

  // 강의 데이터 (상위 10개 또는 하위 10개)
  const highRankLectures: Lecture[] = priorityData.lectureHighRank.slice(0, 10); // 상위 10개
  const lowRankLectures: Lecture[] = priorityData.lectureLowRank.slice(0, 10); // 하위 10개

  //API 연동해서 데이터 불러오기
  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://ittime.site/api/priority'); // API 호출
        const data = await response.json();

        setLectures(data.lectureHighRank.slice(0, 10)); // 상위 10개 강의
        setLowRankLectures(data.lectureLowRank.slice(0, 10)); // 하위 10개 강의
        setTimeRank(data.timeRank.slice(0, 10)); // 참가자 많은 날짜 10개
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
      }
    };

    fetchData();
  }, []);*/

  const lectures = showLowRank ? lowRankLectures : highRankLectures;

  // 참가자가 많은 날짜 10개
  const timeRank: TimeRank[] = priorityData.timeRank.slice(0, 10);

  // 낮은 순 정렬 토글
  const toggleRank = () => {
    setShowLowRank((prev) => !prev);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-2 gap-[24px]">
        {' '}
        {/* 두 박스 간 간격 24px */}
        {/* 참가자가 많은 날짜 (Crowd Forecast) */}
        <div className="border border-gray-300 rounded-md">
          <h2 className="text-lg font-bold mb-[20px]">Crowd Forecast</h2>{' '}
          {/* 제목과 테이블 간 간격 20px */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-[24px] py-[12px]">순위</th>
                <th className="px-[24px] py-[12px]">날짜</th>
                <th className="px-[24px] py-[12px]">시간</th>
                <th className="px-[24px] py-[12px]">예상 인원</th>
              </tr>
            </thead>
            <tbody>
              {timeRank.map((time, index) => (
                <tr key={index} className="text-left">
                  <td className="px-[24px] py-[4px]">{time.rank}</td>
                  <td className="px-[24px] py-[4px]">{time.day}</td>
                  <td className="px-[24px] py-[4px]">{time.startTime}</td>
                  <td className="px-[24px] py-[4px]">{time.reservation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* 강의 순위 (Lecture Tracker) */}
        <div className="border border-gray-300 rounded-md">
          <div className="flex justify-between items-center mb-[20px]">
            {' '}
            {/* 제목과 버튼 간 간격 20px */}
            <h2 className="text-lg font-bold">Lecture Tracker</h2>
            <button
              onClick={toggleRank}
              className="border border-blue-500 text-blue-500 px-[12px] py-[4px] rounded text-sm hover:bg-blue-100"
            >
              {showLowRank ? '높은 순 🔼' : '낮은 순 🔽'}
            </button>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-[24px] py-[12px]">순위</th>
                <th className="px-[24px] py-[12px]">강의명</th>
                <th className="px-[24px] py-[12px]">강연자</th>
                <th className="px-[24px] py-[12px]">신청한 수</th>
                <th className="px-[24px] py-[12px]">즐겨찾기 수</th>
              </tr>
            </thead>
            <tbody>
              {lectures.map((lecture, index) => (
                <tr key={lecture.lectureId} className="text-left">
                  <td className="px-[24px] py-[4px]">{index + 1}</td>
                  <td className="px-[24px] py-[4px]">{lecture.title}</td>
                  <td className="px-[24px] py-[4px]">{lecture.speaker}</td>
                  <td className="px-[24px] py-[4px]">{lecture.reservation}</td>
                  <td className="px-[24px] py-[4px]">{lecture.wishlist}</td>
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
