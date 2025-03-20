import React from 'react';
import WishButton from '@/_components/Wish/WishButton';
import {
  RecommandLectureProps,
  TimeWishProps,
  WishLectureProps,
} from '@/_types/Timetable/Lecture.type';
import { useLectureStore } from '@/_store/LectureList/useLectureStore';

interface ListCardProps {
  lectureList: (RecommandLectureProps | TimeWishProps | WishLectureProps)[];
}

const isWishLecture = (lecture: unknown): lecture is WishLectureProps => {
  return typeof lecture === 'object' && lecture !== null && 'wishlistId' in lecture;
};

const isRecommandLecture = (lecture: unknown): lecture is RecommandLectureProps => {
  return typeof lecture === 'object' && lecture !== null && 'id' in lecture;
};

const ListCard = ({ lectureList }: ListCardProps) => {
  const { wishlist } = useLectureStore();

  return (
    <ul className="flex flex-col gap-4">
      {lectureList.map((lecture) => (
        <li
          key={
            isWishLecture(lecture)
              ? lecture.wishlistId
              : isRecommandLecture(lecture)
                ? lecture.id
                : lecture.lectureId
          }
          className="flex flex-col px-5 py-6 border bg-white"
        >
          <div className="flex items-center gap-2">
            <p className="w-fit border rounded-sm border-[#91CAFF] text-[#1677FF] px-2 py-[1px] font-semibold text-sm leading-[140%]">
              {lecture.location}
            </p>
            <span className="font-semibold text-sm leading-[140%]">
              {new Date(lecture?.startTime).toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })}{' '}
              -{' '}
              {new Date(lecture?.endTime).toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })}
            </span>
          </div>
          <span className="pt-3 pb-2 font-bold text-lg leading-[140%]">{lecture?.title}</span>
          <p className="pb-4 font-medium text-base leading-[140%]">{lecture.speakerName}</p>
          <div className="flex justify-end items-center gap-2 w-full">
            <WishButton
              isWished={
                isWishLecture(lecture)
                  ? wishlist.has(lecture.lectureId)
                  : isRecommandLecture(lecture)
                    ? wishlist.has(lecture.id)
                    : wishlist.has(lecture.lectureId)
              }
              itemId={
                isWishLecture(lecture)
                  ? lecture.lectureId
                  : isRecommandLecture(lecture)
                    ? lecture.id
                    : lecture.lectureId
              }
              className="w-9 h-9"
            />
            <button className="bg-[#155DFC] rounded-lg text-white px-4 py-3 font-semibold text-sm leading-[140%] dark:bg-gray-500 cursor-pointer">
              강의 신청하기
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListCard;
