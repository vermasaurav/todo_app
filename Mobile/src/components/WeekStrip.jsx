import React from "react";

export default function WeekStrip({ selectedDate, onSelectDate }) {
  // Generate the 7 days of the current week (Monday to Sunday)
  const getDaysOfWeek = (baseDate) => {
    const d = new Date(baseDate);
    const day = d.getDay(); // 0 is Sunday
    const diffToMonday = day === 0 ? -6 : 1 - day;

    const monday = new Date(d);
    monday.setDate(d.getDate() + diffToMonday);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const current = new Date(monday);
      current.setDate(monday.getDate() + i);
      days.push(current);
    }
    return days;
  };

  const days = getDaysOfWeek(selectedDate);

  const isSameDay = (d1, d2) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
        {days.map((date, idx) => {
          const isSelected = isSameDay(date, selectedDate);
          const dayName = dayNames[date.getDay()];
          const dayNum = String(date.getDate()).padStart(2, "0");

          return (
            <button
              key={idx}
              onClick={() => onSelectDate(date)}
              className={`flex-1 min-w-[42px] py-2.5 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 ${
                isSelected
                  ? "bg-[#3B5BF5] text-white shadow-md shadow-blue-500/20 scale-105"
                  : "bg-transparent text-gray-500 hover:bg-gray-50"
              }`}
            >
              <span className={`text-[11px] font-medium ${isSelected ? "text-blue-100" : "text-gray-400"}`}>
                {dayName}
              </span>
              <span className={`text-sm font-bold mt-0.5 ${isSelected ? "text-white" : "text-gray-800"}`}>
                {dayNum}
              </span>
              {isSelected && (
                <span className="w-1.5 h-1.5 bg-white rounded-full mt-1"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

