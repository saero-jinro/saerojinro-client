interface LectureReserveButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  isReserved?: boolean;
}

const LectureReserveButton = ({ onClick, className, isReserved }: LectureReserveButtonProps) => {
  return (
    <button
      className={`font-semibold text-[16px] text-white leading-[140%] rounded-xs cursor-pointer ${className}`}
      onClick={onClick}
    >
      {isReserved ? '강의 취소' : '강의 신청'}
    </button>
  );
};

export default LectureReserveButton;
