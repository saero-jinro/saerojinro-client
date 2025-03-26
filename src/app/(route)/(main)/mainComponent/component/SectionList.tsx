'use client';

import SkeletonCard from '@/_components/Card/SkeletonCard';
import { formatTime } from '@/_utils/Card/formatTime';
import { startTransition, useCallback, useEffect, useRef, useState } from 'react';
import ScrollWrapper from './ScrollWrapper';
import Card from '@/_components/Card/Card';
import OptionList from './OptionList';
import { Lectures, ResponseLectures } from '../type/lectures.type';
import { wrapApiResponse } from '@/_utils/api/response';
import { ApiResponse } from '@/_types/Auth/auth.type';
import { Category } from '@/_types/Write/write.type';
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

export type CategoryWithAll = Category | 'ALL';

export const CategoryLabel: Record<CategoryWithAll, string> = {
  ALL: '전체',
  BACKEND: '백엔드',
  FRONTEND: '프론트엔드',
  AI: '인공지능 / 머신러닝',
  DATA: '데이터 분석',
  CLOUD: '클라우드 인프라',
  DEVOPS: 'DevOps / 자동화',
  UX_UI: 'UX·UI 디자인',
  SEC: '보안 / 해킹 대응',
  PM: '기획·PM',
  BLOCKCHAIN: '블록체인',
  MOBILE: '모바일 앱',
};

type CategoryState = Record<CategoryWithAll, ResponseLectures & { load: boolean }>;

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
  const [option, setOption] = useState<CategoryWithAll>('ALL');
  const [loading, setLoading] = useState<boolean>(true);
  const [prevNum, setPrevNum] = useState<number>(5);
  const limitRef = useRef<boolean>(false);
  const prevOptionRef = useRef<CategoryWithAll | null>(null);
  const { wishlist } = useTimetableStore();

  const initialCategoryState = (Object.keys(CategoryLabel) as CategoryWithAll[]).reduce(
    (acc, key) => {
      acc[key] = {
        load: false,
        lectures: [],
        totalCount: 0,
      };
      return acc;
    },
    {} as CategoryState,
  );

  const [lectures, setLectures] = useState<CategoryState>({ ...initialCategoryState });

  const getInitData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getLectures(startDate, startDay);

      if (!res.data) throw new Error('데이터 없음');

      const data = res.data as ResponseLectures;

      setLectures((prev) => ({
        ...prev,
        ALL: {
          ...data,
          load: true,
        },
      }));

      startTransition(() => {
        setPrevNum(data.totalCount);
      });

      limitRef.current = true;
      setLoading(false);
    } catch (error) {
      console.error('강의 로드 실패: 테스트 데이터로 대체', error);
    }
    return;
  }, [setLoading, setPrevNum, setLectures, startDay, startDate]);

  const getFilteringData = useCallback(() => {
    setLoading(true);
    const filteringDto = lectures.ALL.lectures.filter((lecture) => lecture.category === option);
    setLectures((prev) => ({
      ...prev,
      [option]: {
        lectures: filteringDto,
        totalCount: filteringDto.length,
        load: true,
      },
    }));

    startTransition(() => {
      setPrevNum(filteringDto.length);
    });

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [setLoading, setLectures, lectures, option]);

  useEffect(() => {
    const prevOption = prevOptionRef.current;
    if (option === prevOption) return;
    prevOptionRef.current = option;

    // 초기값 받아옴
    if (!limitRef.current) getInitData();

    // 로드가 안됨... 리밋 초기화 (사용자가 옵션 변경시 불러옴)
    if (!lectures.ALL.load) {
      limitRef.current = false;
      return;
    }

    // 캐싱된 값이 있다면 아이템 갯수 반영
    if (lectures[option].load) {
      setPrevNum((prev) => {
        if (prev === lectures[option].totalCount) return prev;
        return lectures[option].totalCount;
      });
      return;
    }

    getFilteringData();
  }, [option, lectures, getFilteringData, getInitData]);

  return (
    <div>
      <OptionList
        option={option}
        ChangeOption={(option: CategoryWithAll) => {
          setOption(option);
        }}
      />
      <ScrollWrapper className="mt-3 h-[410.19px]">
        {loading
          ? Array.from({ length: prevNum }).map((_, idx) => <SkeletonCard key={idx} />)
          : lectures[option].lectures.map((lecture) => (
              <Card
                key={lecture.id}
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
