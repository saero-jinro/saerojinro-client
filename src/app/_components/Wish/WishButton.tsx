import { useTimetableStore } from '@/_store/timetable/useTimetableStore';
import WishFillSvg from '@/assets/Timetable/bookmarkSingle-fill.svg';
import WishEmptySvg from '@/assets/Timetable/bookmarkSingle-stroke.svg';

interface WishButtonProps {
  isWished: boolean;
  itemId: number;
  className?: string;
  iconClassName?: string;
  onBeforeToggle?: () => boolean;
}

const WishButton = ({
  isWished,
  itemId,
  className,
  iconClassName,
  onBeforeToggle,
}: WishButtonProps) => {
  const { toggleWish } = useTimetableStore();

  return (
    <button
      className={`rounded-xs flex justify-center items-center text-white cursor-pointer ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        if (onBeforeToggle && onBeforeToggle() === false) return;
        toggleWish(itemId);
      }}
      aria-label="즐겨찾기"
    >
      {isWished ? (
        <WishFillSvg className={iconClassName || 'text-[#00249C]'} />
      ) : (
        <WishEmptySvg className={iconClassName || 'text-[#015AFF]'} />
      )}
    </button>
  );
};

export default WishButton;
