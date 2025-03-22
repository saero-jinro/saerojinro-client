import useAlarmStore from '@/_store/Header/useAlarmStore';
import { getAlarmTime } from '@/_utils/Header/getAlarmTime';
import { Alarm } from '@/_types/Header/Alarm.type';
type ItemProps = Alarm;

const AlarmList = () => {
  const alarms = useAlarmStore((store) => store.alarms.state.alarms);
  return (
    <ul className="p-6 flex flex-col">
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
    <li className="w-[448px] mt-6">
      <div className="flex justify-between">
        <span className="text-lg font-bold">{title}</span>
        <span className="text-sm">{getAlarmTime(createdAt)}</span>
      </div>

      <div className="mt-2">
        <span>{contents}</span>
      </div>
    </li>
  );
};

export default AlarmList;
