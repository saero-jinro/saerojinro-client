interface DayTabProps {
  days: string[];
  selectedDay: string;
  onSelectDay: (day: string) => void;
}

const DayTab = ({ days, selectedDay, onSelectDay }: DayTabProps) => {
  return (
    <div className="flex justify-between">
      {days.map((day) => (
        <button
          key={day}
          className={`text-center w-full px-4 py-[18px] max-md:py-3 cursor-pointer rounded-sm max-md:rounded-xs font-bold text-xl max-md:text-base ${selectedDay === day ? 'text-white bg-[#00249C] dark:bg-[#001A6F]' : 'text-[#424242] dark:text-[#CAD5E2]'}`}
          onClick={() => onSelectDay(day)}
          aria-label={`select-${day}`}
        >
          DAY {day[3]}
        </button>
      ))}
    </div>
  );
};

export default DayTab;
