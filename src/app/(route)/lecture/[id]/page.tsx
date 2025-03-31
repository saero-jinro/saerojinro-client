'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useTimetableStore } from '@/_store/timetable/useTimetableStore';
import useAuthStore from '@/_store/auth/useAuth';
import useLoginModalStore from '@/_store/modal/useLoginModalStore';
import useDownload from '@/_hooks/download/download';
import TextViewer from '@/_components/TextViewer/TextViewer';
import QuestionSection from '../component/QuestionSection';
import LectureReserveButton from '@/_components/LectureReserveButton/LectureReserveButton';
import WishButton from '@/_components/Wish/WishButton';
import DownloadSvg from '@/assets/Lecture/Download.svg';

interface LectureDetailProps {
  location: string;
  title: string;
  category: string;
  contents: string;
  materialsId: number;
  speakerName: string;
  startTime: string;
  endTime: string;
  speakerEmail: string;
  introduction: string;
  speakerPhotoUrl: string;
}

const formatLectureDate = (startTime: string, endTime: string) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const baseDate = new Date('2025-04-01T00:00:00');
  const diffTime = start.getTime() - baseDate.getTime();
  const diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const dayText = `Day${diffDay + 1}`;

  const toTimeStr = (date: Date) =>
    `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  const timeText = `${toTimeStr(start)} ~ ${toTimeStr(end)}`;

  return { dayText, timeText };
};

const LectureDetailPage = () => {
  const params = useParams();
  const lectureId = params.id as string;
  const [lecture, setLecture] = useState<LectureDetailProps>();
  const accessToken = useAuthStore((store) => store.state.accessToken);
  const { open: openLoginModal } = useLoginModalStore();
  const { toggleReservation, reservation, wishlist } = useTimetableStore();
  const isReserved = reservation.some((lec) => lec.lectureId === Number(lectureId));
  const isWished = wishlist.some((w) => w.lectureId === Number(lectureId));
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;
  const { downloadLectureFile } = useDownload();
  const isLoggedIn = Boolean(accessToken);

  useEffect(() => {
    const fetchLectureDetail = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/lectures/${lectureId}`);
        if (!response.ok) {
          throw new Error('네트워크 응답 오류');
        }
        const lectureDetail: LectureDetailProps = await response.json();
        setLecture(lectureDetail);
      } catch (error) {
        console.error('데이터 불러오기 실패: ', error);
      }
    };

    fetchLectureDetail();
  }, []);

  if (!lecture) return <p>로딩 중...</p>;
  const { dayText, timeText } = formatLectureDate(lecture.startTime, lecture.endTime);

  return (
    <div className="w-full px-[40px] py-16 flex flex-col gap-[40px] max-md:py-8 max-md:px-4 max-md:gap-8 dark:bg-[#070A12]">
      <header className="flex flex-col items-start self-stretch border-b border-b-[#E2E8F0] dark:border-b-[#161F2E] pb-10 max-md:pb-8">
        <div className="flex flex-col gap-3 max-md:gap-2">
          <time>
            <span className="rounded-sm py-1 px-2 text-sm font-medium text-[#2F78FF] bg-[#E6EFFF] dark:text-[#0140B5] dark:bg-[#001046] max-md:font-semibold max-md:text-xs">
              {dayText} | {timeText} | {lecture.location}
            </span>
          </time>
          <h1 className="text-[#212121] dark:text-white font-bold text-[32px] max-md:text-2xl">
            {lecture.title}
          </h1>
          <div className="flex items-center gap-[8px]">
            <span className="font-semibold text-base text-[#2F78FF] dark:text-[#0140B5] max-md:font-medium max-md:text-sm">
              #{lecture.category}
            </span>
          </div>
        </div>
      </header>

      <article>
        <TextViewer content={lecture.contents} />
        <div className="hidden max-md:block max-md:mt-8">
          <button
            onClick={() => downloadLectureFile(lecture.speakerName, lecture.materialsId)}
            disabled={!isLoggedIn}
            className={`btn rounded-xs py-[6px] px-4 flex flex-row items-center justify-center gap-2 font-semibold text-base border 
                ${isLoggedIn ? 'bg-white text-[#015AFF] border-[#015AFF] dark:bg-[#070A12] dark:text-[#014DD9] dark:border-[#003AA5] cursor-pointer' : 'bg-gray-200 text-gray-400 border-gray-300 dark:bg-[#1a1a1a] dark:text-gray-600 dark:border-gray-600 cursor-not-allowed'}
            `}
          >
            <DownloadSvg />
            download
          </button>
        </div>
      </article>

      <article className="flex gap-6 max-md:gap-2 self-stretch max-md:items-center border-t border-t-[#E2E8F0] dark:border-t-[#161F2E] pt-10 max-md:pt-8">
        <div>
          <Image
            src={lecture.speakerPhotoUrl}
            alt={`${lecture.speakerName} 프로필 사진`}
            width={78}
            height={78}
            className="w-[78px] h-[78px] rounded-sm object-cover max-md:w-[44px] max-md:h-[44px]"
          />
        </div>
        <div className="flex flex-col flex-[1_0_0] gap-3 max-md:gap-1">
          <div className="flex item-center">
            <span className="font-bold text-base mr-3 max-md:text-sm max-md:mr-1">
              {lecture.speakerName}
            </span>
            <span className="font-normal text-base max-md:text-sm">{lecture.speakerEmail}</span>
          </div>
          <p className="whitespace-pre-line font-normal text-base max-md:text-sm">
            {lecture.introduction}
          </p>
        </div>
      </article>

      <div className="block max-md:hidden">
        <button
          onClick={() => downloadLectureFile(lecture.speakerName, lecture.materialsId)}
          disabled={!isLoggedIn}
          className={`btn rounded-xs py-[6px] px-4 flex flex-row items-center justify-center gap-2 font-semibold text-base border 
                ${isLoggedIn ? 'bg-white text-[#015AFF] border-[#015AFF] dark:bg-[#070A12] dark:text-[#014DD9] dark:border-[#003AA5] cursor-pointer' : 'bg-gray-200 text-gray-400 border-gray-300 dark:bg-[#1a1a1a] dark:text-gray-600 dark:border-gray-600 cursor-not-allowed'}
            `}
        >
          <DownloadSvg />
          download
        </button>
      </div>

      <div className="flex flex-col gap-6 max-md:gap-5">
        <QuestionSection />
        <div className="flex flex-row gap-2 items-center mt-4 max-md:mt-3">
          <div className="flex flex-col justify-center items-center bg-[#F1F5F9] dark:bg-[#0D121E] w-12 h-12">
            <WishButton
              isWished={isWished}
              itemId={Number(lectureId)}
              className="w-12 h-12"
              iconClassName="w-6 h-6 text-[#015AFF] dark:text-[#014DD9]"
              onBeforeToggle={() => {
                if (!accessToken) {
                  openLoginModal();
                  return false;
                }
                return true;
              }}
            />
          </div>
          <LectureReserveButton
            isReserved={isReserved}
            className="w-full bg-[#155DFC] h-12 dark:bg-[#003AA5]"
            onConfirm={async () => {
              await toggleReservation(Number(lectureId), isReserved);
            }}
            startTime={lecture.startTime}
            endTime={lecture.endTime}
          />
        </div>
      </div>
    </div>
  );
};

export default LectureDetailPage;
