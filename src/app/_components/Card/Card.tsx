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
  speakerName,
  isWished,
  isProfile = false,
  isReserved,
}: CardProps) => {
  const router = useRouter();
  const accessToken = useAuthStore((store) => store.state.accessToken);
  const { open: openLoginModal } = useLoginModalStore();
  const { fetchTimetable, toggleReservation } = useTimetableStore();

  const handleClick = () => {
    router.push(`/lecture/${id}`);
  };

  return (
    <div
      className="overflow-hidden w-[282px] bg-white dark:bg-black border border-[#DEE2E6] rounded-xl cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative">
        <Image
          src={image || 'https://dyns.co.kr/wp-content/uploads/2024/04/placeholder-304.png'}
          alt={title}
          width={282}
          height={170}
          className="w-full h-[170px] object-cover"
          priority
        />
        <WishButton
          isWished={isWished}
          itemId={id}
          className="absolute top-2 right-2"
          onBeforeToggle={() => {
            if (!accessToken) {
              openLoginModal();
              return false;
            }
            return true;
          }}
        />
      </div>
      <div className="px-4 py-5">
        <div className="w-full bg-white text-sm font-semibold leading-[140%] dark:bg-black dark:text-white">
          {time}
        </div>
        <h3 className="text-[20px] font-bold leading-[140%] pt-1 h-15 overflow-hidden">{title}</h3>

        {!isProfile && (
          <div className="flex items-center pt-1">
            <p className="text-sm font-semibold leading-[140%] text-[#A09F9F]">{speakerName}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-1 pt-3">
          <span className="text-sm font-semibold leading-[140%] text-[#878787]">#{category}</span>
        </div>

        {!isProfile && (
          <LectureReserveButton
            isReserved={isReserved}
            className="w-full bg-[#155DFC] px-[94px] py-[13px] mt-3"
            onClick={async (e) => {
              e.stopPropagation();

              if (!accessToken) {
                openLoginModal();
                return;
              }
              try {
                await toggleReservation(id, isReserved ?? false);
                await fetchTimetable();
              } catch (err) {
                console.error('신청 실패:', err);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
