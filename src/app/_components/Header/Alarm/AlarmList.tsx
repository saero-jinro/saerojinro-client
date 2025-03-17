import useAlarmStore, { AlarmView } from '@/_store/Header/useAlarmStore';
import { getAlarmTime } from '@/_utils/Header/getAlarmTime';
type ItemProps = Pick<AlarmView, 'title' | 'contents' | 'time'>;

const AlarmList = () => {
  const alarms = useAlarmStore((store) => store.state.alarms);
  return (
    <ul className="p-6 flex flex-col">
      {alarms.map(({ time, title, contents }, idx) => (
        <AlarmItem key={`${title} + ${idx}`} time={time} title={title} contents={contents} />
      ))}
    </ul>
  );
};

const AlarmItem = ({ time, title, contents }: ItemProps) => {
  return (
    <li className="w-[448px] mt-6">
      <div className="flex justify-between">
        <span className="text-lg font-bold">{title}</span>
        <span className="text-sm">{getAlarmTime(time)}</span>
      </div>

      <div className="mt-2">
        <span>{contents}</span>
      </div>
    </li>
  );
};

export default AlarmList;
