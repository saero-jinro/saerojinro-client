import { FaRegStar, FaStar } from 'react-icons/fa';
import { useLectureStore } from '@/_store/LectureList/useLectureStore';

interface WishButtonProps {
  isWished: boolean;
  itemId: number;
  className?: string;
}

const WishButton = ({ isWished, itemId, className }: WishButtonProps) => {
  const { toggleWish } = useLectureStore();

  return (
    <button
      className={`px-2 py-1 w-8 h-8 bg-gray-200 text-white cursor-pointer ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        toggleWish(itemId);
      }}
      aria-label="즐겨찾기"
    >
      {isWished ? <FaStar color="#000" /> : <FaRegStar color="#000" />}
    </button>
  );
};

export default WishButton;
