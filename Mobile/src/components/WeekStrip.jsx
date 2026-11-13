import React from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

export default function WeekStrip({ selectedDate, onSelectDate, onPrevWeek, onNextWeek, currentWeekLabel }) {
  // Generate the 7 days of the active week (Monday to Sunday)
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

  const isToday = (d) => {
    const now = new Date();
    return isSameDay(d, now);
  };

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs mb-6">
      {/* Week Navigator Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-[#3B5BF5]" />
          <span className="text-xs sm:text-sm font-bold text-gray-800">
            {currentWeekLabel || "Monday - Sunday Week"}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onPrevWeek}
            aria-label="Previous week"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => onSelectDate(new Date())}
            className="text-[11px] font-semibold text-[#3B5BF5] hover:bg-blue-50 px-2 py-1 rounded-md transition-colors"
          >
            Today
          </button>
          <button
            onClick={onNextWeek}
            aria-label="Next week"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Day Selector Grid */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {days.map((date, idx) => {
          const isSelected = isSameDay(date, selectedDate);
          const dayName = dayNames[date.getDay()];
          const dayNum = String(date.getDate()).padStart(2, "0");
          const isCurrentToday = isToday(date);

          return (
            <button
              key={idx}
              onClick={() => onSelectDate(date)}
              className={`py-2.5 sm:py-3 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center transition-all duration-200 relative ${
                isSelected
                  ? "bg-[#3B5BF5] text-white shadow-md shadow-blue-500/25 scale-[1.02]"
                  : "bg-gray-50/70 hover:bg-gray-100/80 text-gray-600"
              }`}
            >
              <span className={`text-[10px] sm:text-xs font-medium ${isSelected ? "text-blue-100" : "text-gray-400"}`}>
                {dayName}
              </span>
              <span className={`text-xs sm:text-sm font-bold mt-0.5 ${isSelected ? "text-white" : "text-gray-800"}`}>
                {dayNum}
              </span>
              {isSelected ? (
                <span className="w-1.5 h-1.5 bg-white rounded-full mt-1"></span>
              ) : isCurrentToday ? (
                <span className="w-1.5 h-1.5 bg-[#3B5BF5] rounded-full mt-1"></span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
