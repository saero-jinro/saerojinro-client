'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface CardProps {
  id: number;
  image: string;
  title: string;
  category: string;
  time: string;
  speakerName: string;
  isProfile?: boolean;
}

const Card = ({ id, image, title, category, time, speakerName, isProfile }: CardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/lecture/${id}`);
  };

  return (
    <div
      className="overflow-hidden w-[282px] border border-[#DEE2E6] rounded-xl cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={282}
          height={170}
          className="w-full h-[170] object-cover"
          priority
        />
        <button
          className="absolute top-4 right-4 bg-gray-200 text-white text-xs px-2 py-1 w-8 h-8"
          onClick={(e) => e.stopPropagation()}
        >
          ⭐️
        </button>
      </div>
      <div className="px-4 py-5">
        <div className="w-full bg-white text-sm font-semibold leading-[140%] dark:bg-black dark:text-white">
          {time}
        </div>
        <h3 className="text-[20px] font-bold leading-[140%] pt-1">{title}</h3>

        {!isProfile && (
          <div className="flex items-center pt-1">
            <p className="text-sm font-semibold leading-[140%] text-[#A09F9F]">{speakerName}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-1 pt-3">
          <span className="text-sm font-semibold leading-[140%] text-[#878787]">#{category}</span>
        </div>

        {!isProfile && (
          <button
            className="w-full text-[16px] font-semibold leading-[140%] bg-[#155DFC] text-white p-3 mt-3 rounded-sm"
            onClick={(e) => e.stopPropagation()}
          >
            강의 신청하기
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
