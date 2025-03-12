'use client';

import { ApiResponse } from '@/api/auth/route';
import { useEffect, useRef, useState } from 'react';
import Card from '@/_components/Card/Card';
import SectionWrapper from './component/SectionWrapper';
import ViewportSlice from '@/_store/Main/viewportStore';

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

const SecSection = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const [lectures, setLectures] = useState<LectureList[]>([]);

  // 세션
  const GAP = 10;
  const viewmode = ViewportSlice((store) => store.state.mode);
  const [scroll, setScroll] = useState<number>(0);
  const [innerWidth, setInnerWidth] = useState<number>(0);
  const [outerWidth, setOuterWidth] = useState<number>(0);
  const CardRef = useRef<HTMLLIElement>(null);
  const OuterRef = useRef<HTMLDivElement>(null);
  const InnerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!OuterRef.current) return;
    setOuterWidth(OuterRef.current.clientWidth);
  }, [lectures, setOuterWidth]);

  useEffect(() => {
    const Card = CardRef.current;
    const Inner = InnerRef.current;
    if (!Card || !Inner) return;

    setInnerWidth((Card.clientWidth + GAP) * lectures.length - GAP);
  }, [lectures]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/test/getLectures`);

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

  // 추후 사이즈 동적으로 변하게 만들어야함...
  const CARDS_PER_SCROLL = 3;

  const scrollByCards = (dire: 1 | -1) => {
    if (!OuterRef.current || !CardRef.current) return;
    const cardWidth = CardRef.current.clientWidth + GAP;
    const scrollAmount = cardWidth * CARDS_PER_SCROLL * dire;

    OuterRef.current.scrollTo({
      left: OuterRef.current.scrollLeft + scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <SectionWrapper className="w-screen mx-auto bg-[#C0C0C0] select-none">
      <div className="">
        <div className="py-[60px] px-[50px] mx-auto flex flex-col gap-3">
          <title>세션소개</title>
          <h1 className="text-[2rem] font-bold">세션소개</h1>

          <ul className="flex gap-[0.5rem] text-gray-950 font-bold">
            <li className="text-lg py-1 px-4 bg-[#000000] rounded-full text-white flex items-center justify-center whitespace-nowrap">
              전체
            </li>
            <li className="text-lg py-1 px-4 bg-[#dadada] rounded-full text-black flex items-center justify-center whitespace-nowrap">
              #AI
            </li>
            <li className="text-lg py-1 px-4 bg-[#dadada] rounded-full text-black flex items-center justify-center whitespace-nowrap">
              #Next.js
            </li>
            <li className="text-lg py-1 px-4 bg-[#dadada] rounded-full text-black flex items-center justify-center whitespace-nowrap">
              #Unity
            </li>
            <li className="text-lg py-1 px-4 bg-[#dadada] rounded-full text-black flex items-center justify-center whitespace-nowrap">
              #OWASP
            </li>
          </ul>
          <div className="relative">
            {viewmode === 'web' && (
              <>
                {scroll > 0 && (
                  <button
                    onClick={() => scrollByCards(-1)}
                    className="absolute w-[40px] h-[40px] flex items-center justify-center left-0 top-1/2 z-50 -translate-y-1/2 -translate-x-[calc(100%_+_10px)] bg-white p-3 border rounded-full shadow"
                  >
                    ◀
                  </button>
                )}

                {scroll + outerWidth < innerWidth && (
                  <button
                    onClick={() => scrollByCards(1)}
                    className="absolute w-[40px] h-[40px] flex items-center justify-center right-0 top-1/2 z-50 -translate-y-1/2 translate-x-[calc(100%_+_10px)] bg-white p-3 border rounded-full shadow"
                  >
                    ▶
                  </button>
                )}
              </>
            )}

            <div
              onScroll={(e) => {
                setScroll(e.currentTarget.scrollLeft);
              }}
              ref={OuterRef}
              className="overflow-x-scroll overflow-y-hidden hide-scrollbar relative"
            >
              <ul ref={InnerRef} className="flex gap-2.5">
                {lectures.length === 0 && <div className="h-[222px]" />}
                {lectures.map((lecture, idx) => (
                  <li ref={CardRef} key={`${lecture.id} + ${idx}`}>
                    <Card
                      id={lecture.id}
                      image={lecture.image}
                      title={lecture.title}
                      category={lecture.category}
                      showWish={true}
                    >
                      <></>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default SecSection;
