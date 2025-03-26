import React from 'react';
import WishButton from '@/_components/Wish/WishButton';
import {
  RecommandLectureProps,
  TimeWishProps,
  WishLectureProps,
} from '@/_types/Timetable/Lecture.type';
import LectureReserveButton from '@/_components/LectureReserveButton/LectureReserveButton';
import useAuthStore from '@/_store/auth/useAuth';
import { useTimetableStore } from '@/_store/timetable/useTimetableStore';
import useLoginModalStore from '@/_store/modal/useLoginModalStore';
import BarSvg from '@/assets/Timetable/Vector 3.svg';

interface ListCardProps {
  lectureList: (RecommandLectureProps | TimeWishProps | WishLectureProps)[];
}

const getLectureId = (lecture: RecommandLectureProps | TimeWishProps | WishLectureProps) => {
  if ('lectureId' in lecture) return lecture.lectureId;
  if ('id' in lecture) return lecture.id;
  return 0;
};

const ListCard = ({ lectureList }: ListCardProps) => {
  const { wishlist, reservation, toggleReservation } = useTimetableStore();
  const accessToken = useAuthStore((store) => store.state.accessToken);
  const { open: openLoginModal } = useLoginModalStore();

  return (
    <ul className="flex flex-col gap-4">
      {lectureList.map((lecture) => {
        const lectureId = getLectureId(lecture);
        const isReserved = reservation.some((r) => r.lectureId === lectureId);

        return (
          <li
            key={getLectureId(lecture)}
            className="flex flex-col px-5 py-5 border border-[#E2E8F0] rounded-sm bg-white"
          >
            <div className="flex items-center gap-2">
              <p className="w-fit text-[#001F85] py-[1px] font-semibold text-sm leading-[140%]">
                {lecture.location}
              </p>
              <BarSvg />
              <span className="font-semibold text-sm leading-[140%] text-[#001F85]">
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
            <span className="pt-3 pb-2 font-semibold text-base leading-[140%]">
              {lecture?.title}
            </span>
            <p className="pb-4 text-[#757575] font-medium text-sm leading-[140%]">
              {lecture.speakerName}
            </p>
            <div className="flex w-full items-center gap-2">
              <WishButton
                isWished={wishlist.some((w) => w.lectureId === getLectureId(lecture))}
                itemId={getLectureId(lecture)}
                className="w-11 h-11 bg-[#F1F5F9]"
                iconClassName="w-6 h-6 text-[#00249C]"
                onBeforeToggle={() => {
                  if (!accessToken) {
                    openLoginModal();
                    return false;
                  }
                  return true;
                }}
              />
              <LectureReserveButton
                isReserved={isReserved}
                className="bg-[#00249C] w-full py-[11px]"
                onClick={async (e) => {
                  e.stopPropagation();

                  if (!accessToken) {
                    openLoginModal();
                    return;
                  }
                  await toggleReservation(getLectureId(lecture), isReserved);
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ListCard;
