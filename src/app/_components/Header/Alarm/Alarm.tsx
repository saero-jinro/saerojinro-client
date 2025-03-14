'use client';
import ToggleModal from '@/_components/ToggleModal';
import AlramIcon from '@/assets/Header/alarm.svg';
import { useState } from 'react';

const Alarm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const ICON_WIDTH = 24;
  const TOP_GAP = 78.32;

  return (
    <div className="relative">
      <button aria-label="open-modal" onClick={openModal}>
        <AlramIcon width={ICON_WIDTH} />
      </button>

      <ToggleModal
        // 스타일 변경될 거 같아서 남겨둠 absol 기반 알림 바로 아래 위치
        // style={{ transform: `translateX(calc(-100% + ${ICON_WIDTH}px))` }}
        // className={`absolute z-[1001] text-black bg-white flex flex-col dark:text-white dark:bg-black`}
        style={{
          transform: `translateX(calc(-100% + ${ICON_WIDTH}px ))`,
          top: `${TOP_GAP}px`,
          height: `calc(100vh - ${TOP_GAP}px )`,
        }}
        className={`fixed z-[1001] top-0 text-black bg-white flex flex-col dark:text-white dark:bg-black`}
        desc="toggle-modal"
        isOpen={isOpen}
        hasOverlay={true}
        onClose={closeModal}
      >
        {/* 스크린 리더 전용 버튼(안보임) */}
        <button aria-label="close-modal" className="sr-only" onClick={closeModal}>
          modal-close
        </button>

        <div className="h-16 p-2 flex justify-center font-bold text-2xl items-center border-solid border-b">
          알림
        </div>
        <ul className="p-6 flex flex-col">
          <li className="w-[448px] mt-6">
            <div className="flex justify-between">
              <span className="text-lg font-bold">강의 시간 변경</span>
              <span className="text-sm">12:30</span>
            </div>

            <div className="mt-2">
              <span>
                03월 06일 ‘코드 그 너머: 소프트웨어 개발의 미래’ 강의가 14시에서 15시로 시간이
                변경되었습니다.
              </span>
            </div>
          </li>

          <li className="w-[448px] mt-6">
            <div className="flex justify-between">
              <span className="text-lg font-bold">강의 시간 변경</span>
              <span className="text-sm">12:30</span>
            </div>

            <div className="mt-2">
              <span>
                03월 06일 ‘코드 그 너머: 소프트웨어 개발의 미래’ 강의가 14시에서 15시로 시간이
                변경되었습니다.
              </span>
            </div>
          </li>

          <li className="w-[448px] mt-6">
            <div className="flex justify-between">
              <span className="text-lg font-bold">강의 시간 변경</span>
              <span className="text-sm">12:30</span>
            </div>

            <div className="mt-2">
              <span>
                03월 06일 ‘코드 그 너머: 소프트웨어 개발의 미래’ 강의가 14시에서 15시로 시간이
                변경되었습니다.
              </span>
            </div>
          </li>
        </ul>
      </ToggleModal>
    </div>
  );
};

export default Alarm;
