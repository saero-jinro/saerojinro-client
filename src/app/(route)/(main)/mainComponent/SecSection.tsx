'use client';

import SectionWrapper from './component/SectionWrapper';
import ScrollWrapper from './component/ScrollWrapper';
import { ApiResponse } from '@/api/auth/route';
import { useEffect, useState } from 'react';
import Card from '@/_components/Card/Card';
import OptionList from './component/OptionList';

interface LectureList {
  id: number;
  title: string;
  category: string;
  start_time: string;
  end_time: string;
  speakerName: string;
  image: string;
}

type GetDtoResPonse = ApiResponse<string>;
export type LectureOption = 'all' | 12 | 13 | 14;

const SecSection = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const [lectureOption, setLectureOption] = useState<LectureOption>('all'); // 강의 옵션 상태
  const [lectures, setLectures] = useState<LectureList[]>([]); // 강의 아이템 리스트[]

  // lectureOption에 따른 API 요청
  useEffect(() => {
    (async () => {
      try {
        const path =
          lectureOption === 'all'
            ? '/api/test/lectures'
            : `/api/test/lectures/date?day=${lectureOption}`;
        const res = await fetch(`${BASE_URL}${path}`);

        if (!res.ok) throw new Error(`API 요청 실패: ${res.status}`);

        const dto: GetDtoResPonse = await res.json();

        if (!dto.ok) throw new Error(`데이터 요청 실패: ${res.status}`);

        if (dto.data) {
          const lectures_ = JSON.parse(dto.data).data.lectures as LectureList[];
          setLectures([...lectures_, ...lectures_]);
        }
      } catch (err: unknown) {
        console.error('api 요청 실패', err);
      }
    })();
  }, [BASE_URL, lectureOption]);

  return (
    <SectionWrapper className="w-screen mx-auto bg-[#C0C0C0] select-none">
      <div className="max-w-[1280px] mx-auto">
        <div className="py-[60px] px-[50px] mx-auto flex flex-col gap-3">
          <h1 className="text-[2rem] font-bold">세션소개</h1>

          {/* 옵션 버튼 리스트 */}
          <OptionList
            option={lectureOption}
            ChangeOption={(option: LectureOption) => setLectureOption(option)}
          />

          {/* 강의 카드 리스트 */}
          <ScrollWrapper>
            {lectures.length === 0 && (
              <div className="h-[222px]" aria-live="polite">
                강의를 불러오는 중...
              </div>
            )}
            {lectures.map((lecture, idx) => (
              <Card
                key={idx}
                id={lecture.id}
                image={lecture.image}
                title={lecture.title}
                time="임시 시간"
                category={lecture.category}
                showWish={true}
              >
                <></>
              </Card>
            ))}
          </ScrollWrapper>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default SecSection;
