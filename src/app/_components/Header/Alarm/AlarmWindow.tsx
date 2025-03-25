'use client';
import type { Alarm } from '@/_types/Header/Alarm.type';
import ToggleModal from '@/_components/ToggleModal';
import AlarmList from './AlarmList';

import useAlarmStore from '@/_store/Header/useAlarmStore';
import ClickButton from '@/_components/ClickButton';
import Image from 'next/image';

// 알림 창 컴포넌트
const Alarm = () => {
  const setIsOpen = useAlarmStore((store) => store.isOpen.actions.setIsOpen);
  const isOpen = useAlarmStore((store) => store.isOpen.state.isOpen);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="fixed flex justify-center">
      {/* 알림 창 */}
      <ToggleModal
        zIndex={1000}
        isOpen={isOpen}
        hasOverlay={true}
        desc="toggle-modal"
        onClose={closeModal}
        className="fixed z-[1001] top-0 text-black flex-[1_0] flex-col bg-white h-screen right-0"
      >
        <div className="w-[375px] md:w-[448px] right-0 h-16 md:h-[80px] p-4 flex justify-between items-center font-bold text-2xl bg-black text-white">
          <ClickButton actionDesc="modal-close" onClickAction={closeModal}>
            <Image alt="left-icon" src="/main/left.webp" width={32} height={32} />
          </ClickButton>
          <span>알림</span>
          <div className="w-4" />
        </div>
        <AlarmList />
      </ToggleModal>
    </div>
  );
};

export default Alarm;
