import { FaRegStar, FaStar } from 'react-icons/fa';
import { useTimetableStore } from '@/_store/timetable/useTimetableStore';

interface WishButtonProps {
  isWished: boolean;
  itemId: number;
  className?: string;
  onBeforeToggle?: () => boolean;
}

const WishButton = ({ isWished, itemId, className, onBeforeToggle }: WishButtonProps) => {
  const { toggleWish } = useTimetableStore();

  return (
    <button
      className={`px-2 py-1 w-8 h-8 bg-gray-200 text-white cursor-pointer ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        if (onBeforeToggle && onBeforeToggle() === false) return;
        toggleWish(itemId);
      }}
      aria-label="즐겨찾기"
    >
      {isWished ? <FaStar color="#000" /> : <FaRegStar color="#000" />}
    </button>
  );
};

export default WishButton;
