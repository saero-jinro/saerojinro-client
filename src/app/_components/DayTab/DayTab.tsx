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
          className={`text-center w-full px-4 py-[18px] cursor-pointer rounded-sm font-bold text-xl ${selectedDay === day ? 'text-white bg-[#00249C] dark:bg-[#001A6F]' : 'dark:text-[#CAD5E2]'}`}
          onClick={() => onSelectDay(day)}
        >
          DAY {day[3]}
        </button>
      ))}
    </div>
  );
};

export default DayTab;
