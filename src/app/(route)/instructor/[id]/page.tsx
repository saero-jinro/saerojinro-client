'use client';

import ScrollWrapper from '@/(route)/(main)/mainComponent/component/ScrollWrapper';
import Card from '@/_components/Card/Card';
import { formatTime } from '@/_utils/Card/formatTime';
import { useEffect, useState } from 'react';
import { ApiResponse } from '@/_types/Auth/auth.type';

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
const Page = () => {
  const [lectures, setLectures] = useState<LectureList[]>([]); // 강의 아이템 리스트[]
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  useEffect(() => {
    (async () => {
      try {
        const path = '/api/test/lectures';

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
  }, [BASE_URL]);

  return (
    <div className="w-screen h-screen box-border pt-[40px]">
      <div className="w-full max-w-[1280px] mx-auto h-screen px-[40px] py-[64px] flex flex-col gap-[54px]">
        {/* 소개 */}
        <div className="w-full h-auto grid [grid-template-columns:333px_auto] gap-[32px]">
          <div className="bg-gray-200 aspect-square flex items-center justify-center text-gray-600">
            이미지 추가 예정
          </div>
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[4px]">
              <span className="font-bold text-[32px]">김지훈</span>
              <span className="font-extralight">jihoon.kim@example.com</span>
            </div>

            <span className="font-bold text-[18px]">3년차 A 테크놀로지 프론트앤드 엔지니어</span>

            <div>
              김지훈 강사는 10년 이상의 개발 경험을 보유한 소프트웨어 엔지니어로, 현재 ABC
              테크놀로지에서 개발팀장을 맡고 있습니다. Vue.js와 Spring Boot를 활용한 풀스택 개발을
              전문으로 하며, 실무에서의 경험을 바탕으로 쉽고 실용적인 개발 강의를 제공합니다. 다수의
              컨퍼런스 발표 및 기술 블로그 운영을 통해 최신 개발 트렌드를 공유하고 있습니다.
            </div>

            <div className=" ">
              <span className="text-[18px] font-bold">주요 경력</span>
              <ul className="pl-[8px]">
                <li>
                  <span className="pr-1">᛫</span> <span>글로벌 IT 기업 웹 플랫폼 개발(5년)</span>
                </li>
                <li>
                  <span className="pr-1">᛫</span> <span>스타트업 CTO 경험(3년)</span>
                </li>
                <li>
                  <span className="pr-1">᛫</span> <span>다수의 IT 기술 강의 및 컨퍼런스 발표</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* 진행중인 강의 */}
        <div className="w-full text-[24px] font-bold">
          <span>현재 진행중인 강의</span>
          <div className="pt-[24px]">
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
                  time={`${formatTime(lecture.start_time)} ~ ${formatTime(lecture.end_time)}`}
                  startTime={lecture.start_time}
                  endTime={lecture.end_time}
                  category={lecture.category}
                  isWished={false}
                  isProfile={true}
                />
              ))}
            </ScrollWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
