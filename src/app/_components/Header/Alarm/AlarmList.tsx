import useAlarmStore from '@/_store/Header/useAlarmStore';
import { Alarm } from '@/_types/Header/Alarm.type';
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
  return (
    <ul className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] p-6 pt-6 overflow-y-scroll hide-scrollbar">
      {alarms.map(({ title, contents, createdAt }, idx) => (
        <AlarmItem
          key={`${title} + ${idx}`}
          title={title}
          contents={contents}
          createdAt={createdAt}
        />
      ))}
      {alarms.map(({ title, contents, createdAt }, idx) => (
        <AlarmItem
          key={`${title} + ${idx}`}
          title={title}
          contents={contents}
          createdAt={createdAt}
        />
      ))}
    </ul>
  );
};

const AlarmItem = ({ createdAt, title, contents }: ItemProps) => {
  return (
    <li className="w-full my-6 text-sm md:text-base">
      <div className="flex justify-between">
        <span className=" font-bold">{title}</span>
        <span className="text-xs md:text-sm font-medium">{getAlarmTime(createdAt)}</span>
      </div>

      <div className="mt-2">
        <span>{contents}</span>
      </div>
    </li>
  );
};

export default AlarmList;
