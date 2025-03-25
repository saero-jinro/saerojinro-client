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
      className="leading-[140%] cursor-pointer relative"
    >
      <AlarmSvg width={scale} height={scale} />
      {isNewMessage && (
        <div className="absolute lef w-[9px] h-[9px] bottom-[0px] right-[2px] bg-red-500 rounded-full" />
      )}
    </ClickButton>
  );
};
export default AlarmButton;
