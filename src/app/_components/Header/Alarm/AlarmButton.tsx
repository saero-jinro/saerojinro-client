import useHeaderStore from '@/_store/Header/useHeaderStore';
import useAlarmStore from '@/_store/Header/useAlarmStore';
import AlarmSvg from '@/assets/Header/alarm.svg';

// 알림 버튼 컴포넌트
export const AlarmButton = ({ scale = 32 }: { scale?: number }) => {
  const setIsOpen = useAlarmStore((store) => store.isOpen.actions.setIsOpen);
  const setCloseMobile = useHeaderStore((store) => store.mobileNavOpen.actions.setClose);

  const openModal = () => {
    setCloseMobile();
    setIsOpen(true);
  };

  return (
    <button className="leading-[140%]" aria-label="open-modal" onClick={openModal}>
      <AlarmSvg alt="alarm-icon" width={scale} height={scale} />
    </button>
  );
};
export default AlarmButton;
