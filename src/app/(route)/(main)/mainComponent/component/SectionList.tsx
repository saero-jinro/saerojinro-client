'use client';

import SkeletonCard from '@/_components/Card/SkeletonCard';
import { formatTime } from '@/_utils/Card/formatTime';
import { useCallback, useEffect, useState } from 'react';
import ScrollWrapper from './ScrollWrapper';
import Card from '@/_components/Card/Card';
import OptionList from './OptionList';
import { Category } from '@/_types/Write/write.type';
import { useTimetableStore } from '@/_store/timetable/useTimetableStore';
import { useLectureStore } from '@/_store/LectureList/useLectureStore';

export interface LectureList {
  id: number;
  title: string;
  category: string;
  start_time: string;
  end_time: string;
  speakerName: string;
  image: string;
}
export interface LectureListProps {
  id: number;
  title: string;
  category: string;
  startTime: string;
  endTime: string;
  speakerName: string;
  thumbnailUri: string;
}
interface Props {
  startDay: number;
  startDate: string;
}

export type CategoryWithAll = Category | 'ALL';

export const CategoryLabel: Record<CategoryWithAll, string> = {
  ALL: 'ALL',
  BACKEND: 'BACKEND',
  FRONTEND: 'FRONTEND',
  AI: 'AI',
  DATA: 'AI',
  CLOUD: 'CLOUD',
  DEVOPS: 'DEVOPS',
  UX_UI: 'UX_UI',
  SEC: 'SEC',
  PM: 'PM',
  BLOCKCHAIN: 'BLOCKCHAIN',
  MOBILE: 'MOBILE',
};

type ResponseLectures = {
  lectures: LectureListProps[];
  totalCount: number;
};

type CategoryState = Record<CategoryWithAll, ResponseLectures & { load: boolean }>;

// 컴포넌트
const SectionList = ({ startDay, startDate }: Props) => {
  const fetchLectures = useLectureStore((store) => store.fetchLectures);
  const lecturelist = useLectureStore((store) => store.lecturelist);
  const [optionList, setOptionList] = useState<CategoryWithAll[]>(['ALL']);
  const [option, setOption] = useState<CategoryWithAll>('ALL');
  const [loading, setLoading] = useState<boolean>(true);
  const [prevNum, setPrevNum] = useState<number>(5);
  const { wishlist, reservation } = useTimetableStore();

  const [lectures, setLectures] = useState<CategoryState>(
    (Object.keys(CategoryLabel) as CategoryWithAll[]).reduce((acc, key) => {
      acc[key] = {
        load: false,
        lectures: [],
        totalCount: 0,
      };
      return acc;
    }, {} as CategoryState),
  );

  // 카테고리 필터링
  const filterLectures = useCallback(
    (category: CategoryWithAll) => {
      if (category === 'ALL') return;

      const filtered = lectures.ALL.lectures.filter((lecture) => lecture.category === category);

      setLectures((prev) => ({
        ...prev,
        [category]: {
          lectures: filtered,
          totalCount: filtered.length,
          load: true,
        },
      }));

      setPrevNum(filtered.length);
    },
    [lectures.ALL.lectures],
  );

  //#region

  // 날짜 기반 강의 fetch
  useEffect(() => {
    const formattedDay = startDay.toString().padStart(2, '0');
    const fullDate = `${startDate}-${formattedDay}`;
    fetchLectures(fullDate);
  }, []);

  // ALL 초기화
  useEffect(() => {
    if (lecturelist.length === 0) return;

    const total = lecturelist.length;

    const uniqueCategories = Array.from(
      new Set(lecturelist.map((item) => item.category).filter(Boolean)),
    ).sort() as CategoryWithAll[];

    setOptionList(['ALL', ...uniqueCategories]);

    setLectures((prev) => ({
      ...prev,
      ALL: {
        lectures: [...lecturelist],
        totalCount: total,
        load: true,
      },
    }));
    setPrevNum(total);
    setLoading(false);
  }, [lecturelist]);

  // 옵션 별 필터링
  useEffect(() => {
    if (option === 'ALL') {
      setPrevNum(lectures.ALL.totalCount);
    } else if (lectures[option].load) {
      setPrevNum(lectures[option].totalCount);
    } else {
      setLoading(true);
      filterLectures(option);
    }
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timeout);
  }, [option, lectures, setPrevNum, filterLectures]);

  //#endregion

  return (
    <div>
      <OptionList option={option} optionList={optionList} ChangeOption={setOption} />
      <ScrollWrapper className="mt-5">
        {loading
          ? Array.from({ length: prevNum }).map((_, idx) => <SkeletonCard key={idx} />)
          : lectures[option].lectures.map((lecture) => (
              <Card
                key={lecture.id}
                id={lecture.id}
                image={lecture.thumbnailUri}
                title={lecture.title}
                time={`${formatTime(lecture.startTime)} ~ ${formatTime(lecture.endTime)}`}
                startTime={lecture.startTime}
                endTime={lecture.endTime}
                category={lecture.category}
                speakerName={lecture.speakerName}
                isWished={wishlist.some((w) => w.lectureId === lecture.id)}
                isProfile={false}
                isReserved={reservation.some((r) => r.lectureId === lecture.id)}
              />
            ))}
      </ScrollWrapper>
    </div>
  );
};

export default SectionList;
