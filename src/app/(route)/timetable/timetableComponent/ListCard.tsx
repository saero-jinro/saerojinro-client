import React from 'react';
import WishButton from '@/_components/Wish/WishButton';
import {
  RecommandLectureProps,
  TimeWishProps,
  WishLectureProps,
} from '@/_types/Timetable/Lecture.type';
import LectureReserveButton from '@/_components/LectureReserveButton/LectureReserveButton';
import { reserveLecture } from '@/_utils/LectureReserveButton/reserveLecture';
import useAuthStore from '@/_store/auth/useAuth';
import { useTimetableStore } from '@/_store/timetable/useTimetableStore';

interface ListCardProps {
  lectureList: (RecommandLectureProps | TimeWishProps | WishLectureProps)[];
}

const getLectureId = (lecture: RecommandLectureProps | TimeWishProps | WishLectureProps) => {
  if ('lectureId' in lecture) return lecture.lectureId;
  if ('id' in lecture) return lecture.id;
  return 0;
};

const ListCard = ({ lectureList }: ListCardProps) => {
  const { wishlist } = useTimetableStore();
  const accessToken = useAuthStore((store) => store.state.accessToken);

  return (
    <ul className="flex flex-col gap-4">
      {lectureList.map((lecture) => (
        <li key={getLectureId(lecture)} className="flex flex-col px-5 py-6 border bg-white">
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
              isWished={wishlist.some((w) => w.lectureId === getLectureId(lecture))}
              itemId={getLectureId(lecture)}
              className="w-9 h-9"
            />
            <LectureReserveButton
              className="bg-[#00249C] px-[66px] py-[11px]"
              onClick={(e) => {
                e.stopPropagation();

                if (!accessToken) {
                  alert('로그인 필요');
                  return;
                }

                reserveLecture(getLectureId(lecture), accessToken);
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListCard;
