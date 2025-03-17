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
          className={`text-center w-full px-4 py-[18px] cursor-pointer rounded-md font-bold text-xl ${selectedDay === day ? 'text-white bg-[#063C86] dark:bg-gray-700' : ''}`}
          onClick={() => onSelectDay(day)}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

export default DayTab;
