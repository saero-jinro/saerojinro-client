'use client';

import useAuthStore from '@/_store/auth/useAuth';
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

  const accessToken = useAuthStore((store) => store.state.accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!accessToken) {
          console.warn('❗ accessToken이 없습니다. 로그인 후 시도해주세요.');
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADMIN_API}/api/dashboard`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log('API 주소:', process.env.NEXT_PUBLIC_BACKEND_ADMIN_API);
        if (!response.ok) throw new Error('API 호출 실패');
        const data = await response.json();

        setLecturesRaw(data.lectureHighRank.concat(data.lectureLowRank));
        setTimeRank(data.timeRank.slice(0, 10));
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
      }
    };
    fetchData();
  }, [accessToken]);

  const toggleSort = () => {
    setIsLowToHigh((prev) => !prev);
  };

  const sortedLectures = useMemo(() => {
    const sorted = [...lecturesRaw].sort((a, b) =>
      isLowToHigh ? a.rank - b.rank : b.rank - a.rank,
    );
    return sorted.slice(0, 10); // 상위 10개만
  }, [lecturesRaw, isLowToHigh]);

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toTimeString().slice(0, 5);
  };

  return (
    <div className="bg-[#F8FAFC] dark:bg-[#02050C] text-black dark:text-white w-full h-screen">
      <div className="w-[1200px] mx-auto pt-[109px] pb-[109px] mb-[84px]">
        <div className="flex gap-[24px]">
          {/* Crowd Forecast */}
          <div className="w-[494px]">
            <h1 className="text-lg font-bold mb-[12px] text-[20px]">Crowd Forecast</h1>
            <div className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1A1A1A]">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-[#00249C] dark:bg-[#1E3A8A] font-bold text-white text-center h-[46px] px-[16px] py-[12px]">
                    <th className="px-[16px] py-[8px] whitespace-nowrap">순위</th>
                    <th className="px-[16px] py-[8px]">날짜</th>
                    <th className="px-[16px] py-[8px]">시간</th>
                    <th className="px-[16px] py-[8px] whitespace-nowrap">예상 인원</th>
                  </tr>
                </thead>
                <tbody>
                  {timeRank.map((time, index) => (
                    <tr
                      key={index}
                      className="border-b border-b-gray-200 dark:border-gray-700 text-center h-[54px] px-[16px] py-[12px] text-center"
                    >
                      <td className="px-[16px] py-[8px] whitespace-nowrap ">{time.rank}</td>
                      <td className="px-[16px] py-[8px] whitespace-nowrap">{time.day}</td>
                      <td className="px-[16px] py-[8px] whitespace-nowrap">
                        {formatTime(time.startTime)}
                      </td>
                      <td className="px-[16px] py-[8px] whitespace-nowrap">{time.expectation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Lecture Tracker */}
          <div className="w-[818px]">
            <div className="flex justify-between items-center mb-[12px]">
              <h1 className="text-lg font-bold text-[20px]">Lecture Tracker</h1>
            </div>
            <div className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#1A1A1A]">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-[#00249C] dark:bg-[#1E3A8A] text-bold text-white h-[46px] px-[16px] py-[12px]">
                    <th className="px-[16px] py-[8px] whitespace-nowrap" onClick={toggleSort}>
                      {isLowToHigh ? '높은 순▲' : '낮은 순▼'}
                    </th>
                    <th className="px-[16px] py-[8px] text-left whitespace-nowrap">강의명</th>
                    <th className="px-[16px] py-[8px] whitespace-nowrap text-center">강연자</th>
                    <th className="px-[16px] py-[8px] text-center whitespace-nowrap">신청한 수</th>
                    <th className="px-[16px] py-[8px] text-center whitespace-nowrap">
                      즐겨찾기 수
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedLectures.map((lecture) => (
                    <tr
                      key={lecture.lectureId}
                      className="border-b border-b-gray-200 dark:border-gray-700 h-[54px] px-[16px] py-[12px]"
                    >
                      <td className="px-[16px] py-[8px] whitespace-nowrap text-center">
                        {lecture.rank}
                      </td>
                      <td className="px-[16px] py-[8px] whitespace-nowrap">{lecture.title}</td>
                      <td className="px-[16px] py-[8px] whitespace-nowrap text-center">
                        {lecture.speaker}
                      </td>
                      <td className="px-[16px]py-[8px] whitespace-nowrap text-center">
                        {lecture.reservation}
                      </td>
                      <td className="px-[16px]py-[8px] whitespace-nowrap text-center">
                        {lecture.wishlist}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
