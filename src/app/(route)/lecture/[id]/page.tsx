'use client';

import { useParams } from 'next/navigation';
import lectureResponse from '@/dummyData/lecture/getLecture.json';
import reviewResponse from '@/dummyData/lecture/getReview.json';
import questionResponse from '@/dummyData/lecture/getQuestion.json';

import TextViewer from '@/_components/TextViewer/TextViewer';
import DownloadSvg from '@/assets/Lecture/Download.svg';
import UserSVG from '@/assets/Lecture/Regular.svg';
import { TextareaHTMLAttributes, useEffect, useRef, useState } from 'react';
import { contents } from '@/dummyData/lecture/getContents';
import useHeaderStore from '@/_store/Header/useHeaderStore';
import LectureReserveButton from '@/_components/LectureReserveButton/LectureReserveButton';
import useAuthStore from '@/_store/auth/useAuth';
import useLoginModalStore from '@/_store/modal/useLoginModalStore';
import { useTimetableStore } from '@/_store/timetable/useTimetableStore';
import WishButton from '@/_components/Wish/WishButton';

// 크기 자동 조절 textArea
const Textarea = ({
  className = '',
  value = '',
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const resize = useHeaderStore((store) => store.viewport.state.width);
  const state = value ?? '';
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [state, ref, resize]);

  return <textarea rows={1} ref={ref} value={value} className={className} {...props} />;
};

interface LectureDetailProps {
  id: number;
  title: string;
  description: string;
  category: string;
  start_time: string;
  end_time: string;
  location: string;
  userId: number;
  status: string;
}

interface ReviewProps {
  id: number;
  userId: number;
  username: string;
  content: string;
  rating: number;
  createdAt: string;
}

interface QuestionProps {
  id: number;
  user_id: number;
  lecture_id: number;
  contents: string;
}

const LectureDetailPage = () => {
  const params = useParams();
  const lectureId = params.id as string;
  const [lecture, setLecture] = useState<LectureDetailProps>();
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [questions, setQuestions] = useState<QuestionProps[]>([]);

  // 테스트 용이에요
  const [text, setText] = useState('');
  const [review, setReview] = useState('소프트웨어 엔지니어가 강연하는 디자이너?? 이거 진짜예요?');

  const accessToken = useAuthStore((store) => store.state.accessToken);
  const { open: openLoginModal } = useLoginModalStore();
  const { toggleReservation, reservation } = useTimetableStore();
  const isReserved = reservation.some((lec) => lec.lectureId === Number(lectureId));

  useEffect(() => {
    // const fetchLectureDetail = async () => {
    //   try {
    //     const response = await fetch(`/api/lectures/${lectureId}`);
    //     if (!response.ok) {
    //       throw new Error('네트워크 응답 오류');
    //     }
    //     const lectureDetail: { data: LectureDetailProps } = await response.json();
    //     setLecture(lectureDetail.data);
    //   } catch (error) {
    //     console.error('데이터 불러오기 실패: ', error);
    //   }
    // };

    // fetchLectureDetail();
    setLecture(lectureResponse.data);
    setReviews(reviewResponse.data.reviews);
    setQuestions(questionResponse.data);
  }, []);

  if (!lecture) return <p>로딩 중...</p>;

  return (
    <div className="w-full px-[40px] py-16 flex flex-col gap-[40px]">
      {/* 데이터 연결 안해서 오류 빌드가 안됨 나중에 삭제 요망 */}
      {reviews && questions && <div className="read-only hidden">{lectureId}</div>}

      {/* 헤더 */}
      <header className="flex flex-col items-start self-stretch border-b border-b-[#E2E8F0] pb-10">
        <div className="flex flex-col gap-3">
          <time>
            <span className="rounded-sm py-1 px-2 text-sm font-medium text-[#2F78FF] bg-[#E6EFFF]">
              Day1 | 09:00 ~ 10:00 | Room A-1
            </span>
          </time>
          <h1 className="font-bold text-[32px]">{lecture.title}</h1>
          <div className="flex items-center gap-[8px]">
            <span className="font-semibold text-base text-[#2F78FF]">#{lecture.category}</span>
          </div>
        </div>
      </header>

      <article>
        <TextViewer content={contents} />
      </article>

      {/* 강사 소개 */}
      <article className="flex gap-6 self-stretch border-t border-t-[#E2E8F0] pt-10">
        <div>
          <div className="bg-gray-300 w-[78px] aspect-square rounded-sm" />
        </div>
        <div className="flex flex-col flex-[1_0_0] gap-3">
          <div className="flex item-center">
            <span className="font-bold text-base mr-3">파크민수</span>
            <span className="font-normal text-base">park@naver.com</span>
          </div>
          <p className="whitespace-pre-line font-normal text-base">
            {`김지훈 강사는 10년 이상의 개발 경험을 보유한 소프트웨어 엔지니어로, 현재 ABC 테크놀로지에서 개발팀장을 맡고 있습니다. 
              Vue.js와 Spring Boot를 활용한 풀스택 개발을 전문으로 하며, 실무에서의 경험을 바탕으로 쉽고 실용적인 개발 강의를 제공합니다. 
              다수의 컨퍼런스 발표 및 기술 블로그 운영을 통해 최신 개발 트렌드를 공유하고 있습니다.`}
          </p>
        </div>
      </article>

      <div>
        <button className="btn rounded-xs py-[6px] px-4 flex flex-row items-center justify-center gap-2 font-semibold text-base bg-white text-[#015AFF] border border-[#015AFF]    ">
          <DownloadSvg />
          download
        </button>
      </div>

      {/* 사전 질문 */}
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold self-stretch">사전 질문</h2>
        <div className="flex gap-6">
          <div className="flex items-center justify-center resize-none w-full bg-[#F1F5F9] text-[#BDBDBD] px-4 rounded-xs">
            <Textarea
              placeholder="강연자에게 질문하고 싶은 것을 입력해주세요. 등록된 사전질문은 작성자와 강연자에게만 보입니다."
              className="w-full border-none min-h-6 overflow-hidden resize-none border px-3 rounded-md focus:outline-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={1}
            />
          </div>
          <button className="btn font-semibold text-base rounded-xs px-4 py-1 w-[62px] h-12 overflow-hidden">
            등록
          </button>
        </div>

        <div className="flex items-start gap-6 self-stretch relative">
          <div className="absolute flex h-[46px] w-[78px] items-center gap-1">
            <div className="w-8 h-8 gap-1">
              <UserSVG />
            </div>
            <div>
              <span className="font-semibold text-base">닉네임</span>
            </div>
          </div>
          <div className="flex-1 pt-8 mt-2 md:pt-0 md:mx-[calc(72px+24px+24px)]">
            <p>
              도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배
              도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배
              도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배
            </p>
          </div>
          <div className="absolute h-[46px] right-0 flex gap-6 items-center ">
            <button>수정</button>
            <button>삭제</button>
          </div>
        </div>

        {/* 수정 가능 댓글 */}
        <div className="flex items-start gap-6 self-stretch relative">
          <div className="flex w-[78px] h-[46px] items-center gap-1 absolute ">
            <div className="w-8 h-8 gap-1">
              <UserSVG />
            </div>
            <div>
              <span className="font-semibold text-base">닉네임</span>
            </div>
          </div>
          <div className="flex-1 pt-8 mt-2 md:pt-0 md:mx-[calc(72px+24px+24px)]">
            <div className="flex items-center justify-center w-full">
              <Textarea
                value={review}
                spellCheck={false}
                onChange={(e) => setReview(e.target.value)}
                className="resize-none w-full overflow-hidden border-none outline-none rounded-[4px] py-2 focus:px-2 focus:border focus:border-solid focus:border-[#1677FF]"
              />
            </div>
          </div>
          <div className="absolute h-[46px] right-0 flex gap-6 items-center">
            <button>수정</button>
            <button>삭제</button>
          </div>
        </div>

        <div className="flex flex-row gap-2 items-center mt-3">
          <div className="flex flex-col justify-center items-center bg-[#F1F5F9] w-12 h-12">
            <WishButton
              isWished={true}
              itemId={1}
              className="pt-1"
              iconClassName="w-6 h-6 text-[#015AFF]"
            />
            <span className="text-[#015AFF] font-bold text-sm">999</span>
          </div>
          <LectureReserveButton
            isReserved={isReserved}
            className="w-full bg-[#155DFC] h-12"
            onClick={async (e) => {
              e.stopPropagation();

              if (!accessToken) {
                openLoginModal();
                return;
              }
              try {
                await toggleReservation(Number(lectureId), isReserved);
              } catch (err) {
                console.error('신청 실패:', err);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LectureDetailPage;
