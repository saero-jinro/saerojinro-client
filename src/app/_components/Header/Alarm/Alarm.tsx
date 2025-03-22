'use client';
import type { Alarm } from '@/_types/Header/Alarm.type';
import ToggleModal from '@/_components/ToggleModal';
import AlramIcon from '@/assets/Header/alarm.svg';
import { CSSProperties } from 'react';
import AlarmList from './AlarmList';

import useAlarmStore from '@/_store/Header/useAlarmStore';

const Alarm = () => {
  const setIsOpen = useAlarmStore((store) => store.isOpen.actions.setIsOpen);
  const isOpen = useAlarmStore((store) => store.isOpen.state.isOpen);
  // const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const ICON_WIDTH = 24;
  const TOP_GAP = 78.32;

  const modalStyle: CSSProperties = {
    height: `calc(100vh - ${TOP_GAP}px )`,
    transform: `translateX(calc(-100% + ${ICON_WIDTH}px ))`,
    top: `${TOP_GAP}px`,
  };

  return (
    <div className="relative">
      {/* 알림 아이콘 */}
      <button aria-label="open-modal" onClick={openModal}>
        <AlramIcon width={ICON_WIDTH} />
      </button>

      {/* 알림 창 */}
      <ToggleModal
        isOpen={isOpen}
        hasOverlay={true}
        style={modalStyle}
        desc="toggle-modal"
        onClose={closeModal}
        className="fixed z-[1001] top-0 text-black bg-white flex flex-col dark:text-white dark:bg-black"
      >
        <div className="h-16 p-2 flex justify-center font-bold text-2xl items-center border-solid border-b w-[448px]">
          알림
        </div>

        <AlarmList />
      </ToggleModal>
    </div>
  );
};

export default Alarm;

// 스타일 변경될 거 같아서 남겨둠 absol 기반
// style={{ transform: `translateX(calc(-100% + ${ICON_WIDTH}px))` }}
// className={`absolute z-[1001] text-black bg-white flex flex-col dark:text-white dark:bg-black`}
