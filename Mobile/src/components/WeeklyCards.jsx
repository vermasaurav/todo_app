import React from "react";
import { CheckSquare, XSquare } from "lucide-react";
import WeeklyBreakdown from "./WeeklyBreakdown";

export default function WeeklyCards({
  weeklyOverview = [],
  onSelectWeek,
  activeWeekIndex,
  showBreakdown = true,
}) {
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
    <div className="space-y-5">
      {/* 2 Summary Cards Side-by-Side matching Figma Design */}
      <div className="grid grid-cols-2 gap-3.5">
        {/* Task Complete Card */}
        <div className="bg-[#EEF2FF] rounded-2xl p-4 sm:p-5 flex flex-col justify-between border border-blue-100 shadow-xs hover:shadow-sm transition-shadow">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-[#3B5BF5]">
              <CheckSquare className="w-4 h-4 text-[#3B5BF5]" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-gray-700">Task Complete</span>
          </div>
          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {String(completedCount).padStart(2, "0")}
            </span>
            <span className="text-[11px] sm:text-xs font-medium text-gray-500">This Week</span>
          </div>
        </div>

        {/* Task Pending Card */}
        <div className="bg-[#FEF2F2] rounded-2xl p-4 sm:p-5 flex flex-col justify-between border border-red-100 shadow-xs hover:shadow-sm transition-shadow">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center text-[#EF4444]">
              <XSquare className="w-4 h-4 text-[#EF4444]" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-gray-700">Task Pending</span>
          </div>
          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {String(pendingCount).padStart(2, "0")}
            </span>
            <span className="text-[11px] sm:text-xs font-medium text-gray-500">This Week</span>
          </div>
        </div>
      </div>

      {/* Weekly Progress Bar Widget */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-gray-900">Weekly Progress</h2>
            <p className="text-[11px] text-gray-400">Completed vs open tasks</p>
          </div>
          <span className="text-sm font-bold text-[#3B5BF5] bg-blue-50 px-2.5 py-1 rounded-lg">
            {progressPercent}%
          </span>
        </div>
        <div className="w-full h-3 bg-[#EEF2FF] rounded-full overflow-hidden mt-3">
          <div
            className="h-full bg-[#1E3A8A] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Optional Weekly Breakdown (e.g. for Desktop Sidebar) */}
      {showBreakdown && (
        <WeeklyBreakdown
          weeklyOverview={weeklyOverview}
          activeWeekIndex={activeWeekIndex}
          onSelectWeek={onSelectWeek}
        />
      )}
    </div>
  );
}
