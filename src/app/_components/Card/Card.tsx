'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import WishButton from '../Wish/WishButton';
import LectureReserveButton from '../LectureReserveButton/LectureReserveButton';
import useAuthStore from '@/_store/auth/useAuth';
import { useTimetableStore } from '@/_store/timetable/useTimetableStore';
import useLoginModalStore from '@/_store/modal/useLoginModalStore';

interface CardProps {
  id: number;
  image: string;
  title: string;
  category: string;
  time: string;
  startTime: string;
  endTime: string;
  speakerName?: string;
  isWished: boolean;
  isProfile?: boolean;
  isReserved?: boolean;
}

const Card = ({
  id,
  image,
  title,
  category,
  time,
  startTime,
  endTime,
  speakerName,
  isWished,
  isProfile = false,
  isReserved,
}: CardProps) => {
  const router = useRouter();
  const accessToken = useAuthStore((store) => store.state.accessToken);
  const { open: openLoginModal } = useLoginModalStore();
  const { toggleReservation } = useTimetableStore();

  const handleClick = () => {
    router.push(`/lecture/${id}`);
  };

  return (
    <div
      className="overflow-hidden w-[282px] h-[410px] bg-white dark:bg-[#070A12] border border-[#DEE2E6] dark:border-[#161F2E] rounded-xl cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative">
        <Image
          src={image || 'https://dyns.co.kr/wp-content/uploads/2024/04/placeholder-304.png'}
          alt={title}
          width={282}
          height={170}
          className="w-full h-[188px] object-cover"
          priority
        />
        <WishButton
          isWished={isWished}
          itemId={id}
          className="absolute top-2 right-2"
          iconClassName="w-8 h-8 text-[#015AFF] dark:text-[#003AA5]"
          onBeforeToggle={() => {
            if (!accessToken) {
              openLoginModal();
              return false;
            }
            return true;
          }}
        />
      </div>
      <div className="p-4">
        <div className="h-[130px]">
          <div className="w-full bg-white text-sm font-semibold leading-[140%] dark:bg-[#070A12] dark:text-[#CAD5E2]">
            {time}
          </div>
          <h3 className="text-[20px] font-bold leading-[140%] pt-[2px] overflow-hidden">{title}</h3>

          {!isProfile && (
            <div className="flex items-center pt-1">
              <p className="text-sm font-semibold leading-[140%] text-[#757575] dark:text-[#62748E]">
                {speakerName}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-1 pt-2">
            <span className="text-sm font-semibold leading-[140%] text-[#2F78FF] dark:text-[#0140B5]">
              #{category}
            </span>
          </div>
        </div>
        {!isProfile && (
          <LectureReserveButton
            isReserved={isReserved}
            className="w-full bg-[#015AFF] dark:bg-[#003AA5] px-[94px] py-[13px] mt-3"
            onConfirm={async () => {
              await toggleReservation(id, isReserved ?? false);
            }}
            startTime={startTime}
            endTime={endTime}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
