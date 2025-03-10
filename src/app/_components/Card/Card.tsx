'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface CardProps {
  id: number;
  image: string;
  title: string;
  category: string;
  children: React.ReactNode;
  time?: string;
  showWish?: boolean;
}

const Card = ({ id, image, title, category, children, time, showWish = true }: CardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/lecture/${id}`);
  };

  return (
    <div className="overflow-hidden w-60 cursor-pointer" onClick={handleClick}>
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={300}
          height={200}
          className="w-full h-36 object-cover"
          priority
        />
        {showWish && (
          <button
            className="absolute top-2 right-2 bg-gray-700 text-white text-xs px-2 py-1"
            onClick={(e) => e.stopPropagation()}
          >
            즐찾
          </button>
        )}
      </div>
      <div className="p-4 border">
        {time && <div className="w-full bg-white text-xs text-black py-1 rounded">{time}</div>}
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex flex-wrap gap-1">
          <span className="text-xs text-gray-500">#{category}</span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Card;
