'use client';

import { useEffect, useState } from 'react';
import response from '@/dumyData/lecture-list/getLectureList.json';
import { useRouter } from 'next/navigation';

interface LectureListProps {
  id: number;
  title: string;
  category: string;
  start_time: string;
  end_time: string;
  location: string;
}

const LectureListPage = () => {
  const [lectures, setLectures] = useState<LectureListProps[]>([]);
  const router = useRouter();

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
    setLectures(response.data.lectures);
  }, []);

  return (
    <div className="pt-10">
      <h1>강의 목록</h1>
      <ul>
        {lectures.map((lecture) => (
          <li
            key={lecture.id}
            className="cursor-pointer hover:bg-gray-100"
            onClick={() => router.push(`/lecture/${lecture.id}`)}
          >
            <strong>{lecture.title}</strong> ({lecture.category})<br />
            {lecture.start_time} ~ {lecture.end_time} <br />
            장소: {lecture.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LectureListPage;
