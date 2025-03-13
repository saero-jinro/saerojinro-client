interface DayTabProps {
  days: string[];
  selectedDay: string;
  onSelectDay: (day: string) => void;
}

const DayTab = ({ days, selectedDay, onSelectDay }: DayTabProps) => {
  return (
    <div className="flex justify-between border-b-1 mb-4 ">
      {days.map((day) => (
        <button
          key={day}
          className={`text-center w-full py-1 cursor-pointer ${selectedDay === day ? 'bg-gray-200 dark:bg-gray-700' : ''} hover:bg-gray-100`}
          onClick={() => onSelectDay(day)}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

export default DayTab;
