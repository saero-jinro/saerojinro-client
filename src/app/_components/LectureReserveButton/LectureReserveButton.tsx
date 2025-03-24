interface LectureReserveButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const LectureReserveButton = ({ onClick, className }: LectureReserveButtonProps) => {
  return (
    <button
      className={`font-semibold text-[16px] text-white leading-[140%] rounded-xs cursor-pointer ${className}`}
      onClick={onClick}
    >
      강의 신청
    </button>
  );
};

export default LectureReserveButton;
