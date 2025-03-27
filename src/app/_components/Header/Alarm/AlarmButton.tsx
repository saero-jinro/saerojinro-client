import useHeaderStore from '@/_store/Header/useHeaderStore';
import useAlarmStore from '@/_store/Header/useAlarmStore';
import AlarmSvg from '@/assets/Header/alarm.svg';
import ClickButton from '@/_components/ClickButton';

// 알림 버튼 컴포넌트
export const AlarmButton = ({ scale = 32 }: { scale?: number }) => {
  const setIsOpen = useAlarmStore((store) => store.isOpen.actions.setIsOpen);
  const setCloseMobile = useHeaderStore((store) => store.mobileNavOpen.actions.setClose);
  const isNewMessage = useAlarmStore((store) => store.isNewMessage.state.isNewMessage);

  const openModal = () => {
    setCloseMobile();
    setIsOpen(true);
  };

  return (
    <ClickButton
      actionDesc="open-alarmWindow"
      onClick={openModal}
      aria-label="open-modal"
      className="leading-[140%] z-0 cursor-pointer relative p-2"
    >
      <div style={{ width: `${scale}px`, height: `${scale}px` }}>
        <AlarmSvg />
      </div>
      {isNewMessage && (
        <div className="absolute w-[4px] h-[4px] top-2 right-2 bg-[#E7000B] rounded-full" />
      )}
    </ClickButton>
  );
};
export default AlarmButton;
