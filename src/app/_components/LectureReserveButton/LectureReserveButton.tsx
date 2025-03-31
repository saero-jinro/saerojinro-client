import { useRouter } from 'next/navigation';
import useAuthStore from '@/_store/auth/useAuth';
import useLoginModalStore from '@/_store/modal/useLoginModalStore';
import useHeaderStore from '@/_store/Header/useHeaderStore';
import { useTimetableStore } from '@/_store/timetable/useTimetableStore';
import { hasTimeConflict } from '@/_utils/ReserveLecture/timeConflict';

interface LectureReserveButtonProps {
  isReserved?: boolean;
  className?: string;
  onConfirm: () => Promise<void>;
  startTime: string;
  endTime: string;
}

const LectureReserveButton = ({
  isReserved,
  className = '',
  onConfirm,
  startTime,
  endTime,
}: LectureReserveButtonProps) => {
  const accessToken = useAuthStore((store) => store.state.accessToken);
  const { open: openLoginModal } = useLoginModalStore();
  const showPopup = useHeaderStore((store) => store.popup.actions.showPopup);
  const reservation = useTimetableStore((store) => store.reservation);
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!accessToken) {
      openLoginModal();
      return;
    }

    if (isReserved) {
      showPopup({
        contents: '강의를 취소하시겠습니까?',
        func: async () => {
          await onConfirm();
        },
      });
    } else {
      const isConflict = hasTimeConflict(
        { startTime, endTime },
        reservation.map((lec) => ({ startTime: lec.startTime, endTime: lec.endTime })),
      );

      if (isConflict) {
        showPopup({ contents: '이미 신청한 강의가 있습니다.' });
        return;
      }

      try {
        await onConfirm();
        showPopup({
          contents: '신청하신 강의를 확인하러\n시간표로 이동하시겠습니까?',
          func: () => {
            router.push('/timetable');
          },
        });
      } catch (err) {
        console.error('강의 신청 실패:', err);
        showPopup({ contents: '신청 처리 중 오류가 발생했습니다.' });
      }
    }
  };

  return (
    <button
      className={`font-semibold text-base text-white leading-[140%] rounded-xs cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {isReserved ? '강의 취소' : '강의 신청'}
    </button>
  );
};

export default LectureReserveButton;
