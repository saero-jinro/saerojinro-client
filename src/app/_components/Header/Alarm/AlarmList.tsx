import useAlarmStore from '@/_store/Header/useAlarmStore';
import { Alarm } from '@/_types/Header/Alarm.type';
import { UIEvent, useCallback, useEffect, useRef, useState } from 'react';
import DownSVG from '@/assets/Main/down.svg';
import ClickButton from '@/_components/ClickButton';
type ItemProps = Alarm;

const SEC_MINUTE = 60;
const SEC_HOUR = 60 * SEC_MINUTE;
const SEC_DAY = 24 * SEC_HOUR;

export const getAlarmTime = (time: string) => {
  const alarmTime = new Date(time);
  const kstTime = new Date(alarmTime.getTime() + 9 * 60 * 60 * 1000);
  const curTime = new Date();
  const diffSec = Math.round((curTime.getTime() - kstTime.getTime()) / 1000);

  if (diffSec < SEC_MINUTE) return `${diffSec}초 전`;
  if (diffSec < SEC_HOUR) return `${Math.floor(diffSec / 60)}분 전`;
  if (diffSec < SEC_DAY) return `${Math.floor(diffSec / (60 * 60))}시간 전`;

  return `${Math.floor(diffSec / (60 * 60 * 24))}일 전`;
};

const AlarmList = () => {
  const alarms = useAlarmStore((store) => store.alarms.state.alarms);
  const isOpen = useAlarmStore((store) => store.isOpen.state.isOpen);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const ulRef = useRef<HTMLUListElement>(null);
  const SCROLL_THRESHOLD = 100;

  // 스크롤이 끝인지 아닌지 판별
  const scrollHandler = useCallback((e: UIEvent<HTMLUListElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isBottom = scrollTop >= scrollHeight - clientHeight - SCROLL_THRESHOLD;
    setIsEnd(isBottom);
  }, []);

  const scrollToBottom = useCallback(({ smooth = false }: { smooth?: boolean }) => {
    const ul = ulRef.current;
    if (!ul) return;
    ul.scrollTo({
      top: ul.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    scrollToBottom({ smooth: false });
  }, [isOpen, scrollToBottom]);

  return (
    <ul
      onScroll={scrollHandler}
      ref={ulRef}
      className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] p-6 pt-6 overflow-y-scroll hide-scrollbar relative"
    >
      {alarms.map(({ title, contents, createdAt }, idx) => (
        <AlarmItem
          key={`${title} + ${idx}`}
          title={title}
          contents={contents}
          createdAt={createdAt}
        />
      ))}

      {!isEnd && (
        <ClickButton
          actionDesc="scroll-end"
          onClick={() => {
            scrollToBottom({ smooth: true });
          }}
          className="fixed z-[10000] w-8 h-8 shadow-[0_0_0_1.5px_#6a728249] cursor-pointer bg-[#f8f8f8] text-gray-400 rounded-full overflow-hidden right-[4px] bottom-[20px] hover:brightness-90"
        >
          <DownSVG className="pt-[2.5px]" width={32} height={32} />
        </ClickButton>
      )}
    </ul>
  );
};

const AlarmItem = ({ createdAt, title, contents }: ItemProps) => {
  return (
    <li className="w-full text-[#212121] dark:text-[#fff] py-4 border-b border-b-[#E2E8F0] dark:border-b-[#161F2E] text-sm md:text-base">
      <div className="flex justify-between">
        <span className=" font-bold">{title}</span>
        <span className="text-xs md:text-sm font-medium ">{getAlarmTime(createdAt)}</span>
      </div>

      <div className="mt-2 w-full">
        <p className="break-words whitespace-normal w-full block">{contents}</p>
      </div>
    </li>
  );
};

export default AlarmList;
