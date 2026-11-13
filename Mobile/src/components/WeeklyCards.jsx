import React, { useState } from "react";
import { CheckSquare, XSquare, ChevronDown, ChevronUp, Calendar } from "lucide-react";

export default function WeeklyCards({ weeklyOverview = [], onSelectWeek, activeWeekIndex }) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const currentWeek = weeklyOverview[activeWeekIndex || 0] || {
    weekLabel: "This Week",
    openTasks: 0,
    completedTasks: 0,
    totalTasks: 0,
    tasks: [],
  };

  const completedCount = currentWeek.completedTasks || 0;
  const pendingCount = currentWeek.openTasks || 0;
  const total = currentWeek.totalTasks || (completedCount + pendingCount);
  const progressPercent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return (
    <div className="px-5 py-2">
      {/* 2 Summary Cards Side-by-Side matching Figma Screenshot 2 */}
      <div className="grid grid-cols-2 gap-3.5 mb-5">
        {/* Task Complete Card */}
        <div className="bg-[#EEF2FF] rounded-2xl p-4 flex flex-col justify-between border border-blue-100/50 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-[#3B5BF5]">
              <CheckSquare className="w-4 h-4 text-[#3B5BF5]" />
            </div>
            <span className="text-xs font-semibold text-gray-700">Task Complete</span>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              {String(completedCount).padStart(2, "0")}
            </span>
            <span className="text-[11px] font-medium text-gray-500">This Week</span>
          </div>
        </div>

        {/* Task Pending Card */}
        <div className="bg-[#FEF2F2] rounded-2xl p-4 flex flex-col justify-between border border-red-100/50 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center text-[#EF4444]">
              <XSquare className="w-4 h-4 text-[#EF4444]" />
            </div>
            <span className="text-xs font-semibold text-gray-700">Task Pending</span>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              {String(pendingCount).padStart(2, "0")}
            </span>
            <span className="text-[11px] font-medium text-gray-500">This Week</span>
          </div>
        </div>
      </div>

      {/* Weekly Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-bold text-gray-900">Weekly Progress</h2>
          <span className="text-xs font-semibold text-[#3B5BF5]">{progressPercent}%</span>
        </div>
        <div className="w-full h-3 bg-[#EEF2FF] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1E3A8A] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Weekly Accordion (Specification 3.2: Grouped by Monday to Sunday, clickable to expand) */}
      {weeklyOverview.length > 1 && (
        <div className="mb-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            All Weeks (Mon - Sun)
          </div>
          <div className="space-y-2">
            {weeklyOverview.map((week, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs"
                >
                  <button
                    onClick={() => {
                      setExpandedIndex(isExpanded ? null : idx);
                      if (onSelectWeek) onSelectWeek(idx);
                    }}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#3B5BF5]" />
                      <span className="text-sm font-semibold text-gray-800">{week.weekLabel}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
                        Open: {week.openTasks}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-medium">
                        Done: {week.completedTasks}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

