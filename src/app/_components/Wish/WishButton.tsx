import { FaRegStar, FaStar } from 'react-icons/fa';

interface WishButtonProps {
  isWished: boolean;
  onToggleWish: (event: React.MouseEvent<HTMLButtonElement>) => void;
  itemId: number;
  className?: string;
}

const WishButton = ({ isWished, onToggleWish, itemId, className }: WishButtonProps) => {
  return (
    <button
      className={`px-2 py-1 w-8 h-8 bg-gray-200 text-white ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        onToggleWish(e);
      }}
    >
      {isWished ? <FaStar color="#000" /> : <FaRegStar color="#000" />}
    </button>
  );
};

export default WishButton;
