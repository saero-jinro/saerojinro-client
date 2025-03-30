import { useSearchParams, useRouter } from 'next/navigation';

interface DayTabProps {
  days: string[];
  selectedDay: string;
  onSelectDay: (day: string) => void;
}

const DayTab = ({ days, selectedDay, onSelectDay }: DayTabProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (day: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('day', day);

    router.push(`?${newParams.toString()}`);
    onSelectDay(day);
  };

  return (
    <div className="flex justify-between">
      {days.map((day) => (
        <button
          key={day}
          className={`text-center w-full px-4 py-[18px] max-md:py-3 cursor-pointer rounded-sm max-md:rounded-xs font-bold text-xl max-md:text-base ${selectedDay === day ? 'text-white bg-[#00249C] dark:bg-[#001A6F]' : 'text-[#424242] dark:text-[#CAD5E2]'}`}
          onClick={() => {
            handleClick(day);
          }}
        >
          DAY {day[3]}
        </button>
      ))}
    </div>
  );
};

export default DayTab;
