'use client';

import useAlarmStore from '@/_store/Header/useAlarmStore';
import { CSSProperties, useEffect, useState } from 'react';
import type { Alarm } from '@/_types/Header/Alarm.type';
import ToggleModal from '@/_components/ToggleModal';
import AlramIcon from '@/assets/Header/alarm.svg';
import AlarmList from './AlarmList';

const Alarm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const ICON_WIDTH = 24;
  const TOP_GAP = 78.32;

  const addAlarm = useAlarmStore((store) => store.actions.addAlarm);
  const resetAlarms = useAlarmStore((store) => store.actions.resetAlarm);

  const modalStyle: CSSProperties = {
    height: `calc(100vh - ${TOP_GAP}px )`,
    transform: `translateX(calc(-100% + ${ICON_WIDTH}px ))`,
    top: `${TOP_GAP}px`,
  };

  const dumyData: Alarm[] = [
    {
      id: 1,
      lectureId: 2,
      title: '강의 시간 변경',
      contents: `03월 06일 ‘코드 그 너머: 소프트웨어 개발의 미래’
      강의가 14시에서 15시로 시간이 변경되었습니다.`,
    },
    {
      id: 1,
      lectureId: 2,
      title: '강의 시간 변경',
      contents: `03월 07일 ‘코드 그 너머: 소프트웨어 개발의 미래’
      강의가 13시에서 14시로 시간이 변경되었습니다.`,
    },
    {
      id: 1,
      lectureId: 2,
      title: '강의 시간 변경',
      contents: `03월 06일 ‘코드 그 너머: 소프트웨어 개발의 미래’
      강의가  room-a1 에서 room-a2로 변경되었습니다.`,
    },
  ];

  // SSE 여기에 이벤트 구독 필요
  useEffect(() => {
    resetAlarms();
    dumyData.forEach((item, idx) => {
      setTimeout(() => {
        addAlarm(item);
      }, idx * 5000);
    });
  }, []);

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
