import React, { useState } from "react";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";

export default function WeeklyBreakdown({ weeklyOverview = [], onSelectWeek, activeWeekIndex }) {
  const [expandedIndex, setExpandedIndex] = useState(activeWeekIndex || 0);

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#3B5BF5]" />
          <span>Weekly Breakdown (Mon - Sun)</span>
        </div>
        <span className="text-[11px] text-gray-400 font-medium">
          {weeklyOverview.length} {weeklyOverview.length === 1 ? "Week" : "Weeks"}
        </span>
      </div>

      {/* Accordion List */}
      <div className="space-y-2">
        {weeklyOverview.map((week, idx) => {
          const isExpanded = expandedIndex === idx;
          const isSelected = activeWeekIndex === idx;
          return (
            <div
              key={idx}
              className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                isSelected ? "border-[#3B5BF5] bg-blue-50/20" : "border-gray-200/80 bg-gray-50/50 hover:bg-gray-50"
              }`}
            >
              <button
                onClick={() => {
                  setExpandedIndex(isExpanded ? null : idx);
                  if (onSelectWeek) onSelectWeek(idx);
                }}
                className="w-full px-3.5 py-2.5 flex items-center justify-between text-left transition-colors"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-800">{week.weekLabel}</span>
                  <span className="text-[10px] text-gray-400">
                    {week.totalTasks} Total {week.totalTasks === 1 ? "task" : "tasks"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-100 text-[#3B5BF5] font-semibold">
                    Open: {week.openTasks}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-green-100 text-green-700 font-semibold">
                    Done: {week.completedTasks}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Expanded Details list if clicked */}
              {isExpanded && week.tasks && week.tasks.length > 0 && (
                <div className="px-3.5 pb-3 pt-1 border-t border-gray-100 space-y-1.5 bg-white">
                  {week.tasks.slice(0, 5).map((t) => (
                    <div
                      key={t._id}
                      className="text-xs text-gray-600 flex items-center justify-between py-1"
                    >
                      <span className={`truncate max-w-[180px] ${t.status === "Completed" ? "line-through text-gray-400" : ""}`}>
                        • {t.title}
                      </span>
                      <span className="text-[10px] text-gray-400">{t.startTime || ""}</span>
                    </div>
                  ))}
                  {week.tasks.length > 5 && (
                    <p className="text-[10px] text-blue-600 font-medium pt-1">
                      + {week.tasks.length - 5} more tasks
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
