'use client';

import { useLectureStore } from '@/_store/LectureList/useLectureStore';
import { useEffect, useRef, useState } from 'react';
import OptionList from './OptionList';
import ScrollWrapper from './ScrollWrapper';
import Card from '@/_components/Card/Card';
import { formatTime } from '@/_utils/Card/formatTime';
import { Lectures } from '@/_types/Lectures/lectures.type';
import { getLectures } from '@/_utils/Main/getLectures';

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
  initLectures: Lectures;
  isLecturesFetched: boolean;
}

const SectionList = ({ startDay, startDate, initLectures, isLecturesFetched }: Props) => {
  const [lectureOption, setLectureOption] = useState<number>(startDay); // 강의 옵션 상태
  const [lectures, setLectures] = useState<Lectures>(initLectures);
  const isInitialLoad = useRef<boolean>(isLecturesFetched); // 초기값 패치 여부
  const { wishlist } = useLectureStore();

  // lectureOption에 따른 API 요청
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return; // 첫 요청은 서버에서 처리했으므로 무시함
    }

    (async () => {
      try {
        const data = await getLectures(startDate, lectureOption);
        console.log(data);
        setLectures(data);
      } catch (error) {
        console.error('강의 로드 실패: 테스트 데이터로 대체', error);
      }
    })();
  }, [lectureOption, startDate]);

  useEffect(() => {
    console.log(lectures);
  }, [lectures]);

  return (
    <>
      <OptionList
        className="mt-6"
        startDay={startDay}
        option={lectureOption}
        ChangeOption={(option: number) => setLectureOption(option)}
      />
      {/* 강의 카드 리스트 */}
      <ScrollWrapper>
        {lectures.length === 0 && <div className="h-[222px]">강의 리스트를 불러오는 중...</div>}
        {lectures.map((lecture, idx) => (
          <Card
            key={idx}
            id={lecture.id}
            image={lecture.thumbnailUri}
            title={lecture.title}
            time={`${formatTime(lecture.startTime)} ~ ${formatTime(lecture.endTime)}`}
            category={lecture.category}
            speakerName={lecture.speakerName}
            isWished={wishlist.has(lecture.id)}
            isProfile={false}
          />
        ))}
      </ScrollWrapper>
    </>
  );
};

export default SectionList;
