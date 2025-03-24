'use client';

import { useLectureStore } from '@/_store/LectureList/useLectureStore';
import SkeletonCard from '@/_components/Card/SkeletonCard';
import { formatTime } from '@/_utils/Card/formatTime';
import { useEffect, useRef, useState } from 'react';
import ScrollWrapper from './ScrollWrapper';
import Card from '@/_components/Card/Card';
import OptionList from './OptionList';
import { Lectures, ResponseLectures } from '../type/lectures.type';
import { wrapApiResponse } from '@/_utils/api/response';
import { ApiResponse } from '@/_types/Auth/auth.type';
import { useTimetableStore } from '@/_store/timetable/useTimetableStore';

export interface LectureList {
  id: number;
  title: string;
  category: string;
  start_time: string;
  end_time: string;
  speakerName: string;
  image: string;
}

interface Props {
  startDay: number;
  startDate: string;
  initLectures?: Lectures;
}

// 강의 데이터 추출 훅
const getLectures = async (date: string, day: number): Promise<ApiResponse<ResponseLectures>> => {
  const BACK_URL = process.env.NEXT_PUBLIC_BACKEND_API;
  const formattedDay = day.toString().padStart(2, '0');
  const fullDate = `${date}-${formattedDay}`;
  const URL = `${BACK_URL}/api/lectures/date?date=${fullDate}`;

  return wrapApiResponse(
    () => fetch(`${URL}`),
    (res) => res.json().then((dto: ResponseLectures) => dto),
  );
};

// 컴포넌트
const SectionList = ({ startDay, startDate }: Props) => {
  const [lectureOption, setLectureOption] = useState<number>(startDay); // 강의 옵션 상태
  const [lectures, setLectures] = useState<Lectures>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [prevNum, setPrevNum] = useState<number>(5);
  const { wishlist } = useTimetableStore();

  // 캐싱
  const cacheRef = useRef<Map<string, Lectures>>(new Map());

  // 세션 데이터 가져오기
  useEffect(() => {
    const cacheKey = `${startDate}-${lectureOption}`;
    (async () => {
      setLoading(true);

      // 데이터 캐싱 처리
      if (cacheRef.current.has(cacheKey)) {
        const cachedData = cacheRef.current.get(cacheKey)!;
        setLectures(cachedData);
        setPrevNum(cachedData.length);
        return;
      }

      try {
        const res = await getLectures(startDate, lectureOption);

        if (!res.data) throw new Error('데이터 없음');

        const data = res.data as ResponseLectures;
        cacheRef.current.set(cacheKey, data.lectures);
        setLectures(data.lectures);
        setPrevNum(data.totalCount);
        setLoading(false);
      } catch (error) {
        console.error('강의 로드 실패: 테스트 데이터로 대체', error);
      }
    })();
  }, [lectureOption, startDate]);

  // 옵션 변경시 로딩 초기화
  useEffect(() => {
    setLoading(false);
  }, [lectureOption]);

  return (
    <div>
      <OptionList
        startDay={startDay}
        option={lectureOption}
        ChangeOption={(option: number) => setLectureOption(option)}
      />
      {/* 강의 카드 리스트 */}
      <ScrollWrapper className="mt-3">
        {loading && Array.from({ length: prevNum }).map((_, i) => <SkeletonCard key={i} />)}

        {lectures.map((lecture, idx) => (
          <Card
            key={idx}
            id={lecture.id}
            image={lecture.thumbnailUri}
            title={lecture.title}
            time={`${formatTime(lecture.startTime)} ~ ${formatTime(lecture.endTime)}`}
            category={lecture.category}
            speakerName={lecture.speakerName}
            isWished={wishlist.some((w) => w.lectureId === lecture.id)}
            isProfile={false}
          />
        ))}
      </ScrollWrapper>
    </div>
  );
};

export default SectionList;
