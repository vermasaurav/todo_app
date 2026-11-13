import React, { useState } from "react";
import { Check, Trash2, Edit3, Clock } from "lucide-react";

export default function TaskList({
  tasks = [],
  title = "Tasks Today",
  onToggleStatus,
  onEditTask,
  onDeleteTask,
  onViewAll,
  showViewAll = true,
}) {
  const [swipedTaskId, setSwipedTaskId] = useState(null);
  const [touchStart, setTouchStart] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e, taskId) => {
    const touchEnd = e.changedTouches[0].clientX;
    // Swipe left (more than 50px)
    if (touchStart - touchEnd > 50) {
      setSwipedTaskId(taskId);
    } else if (touchEnd - touchStart > 50) {
      setSwipedTaskId(null);
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">High</span>;
      case "Medium":
        return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">Medium</span>;
      case "Low":
      default:
        return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">Low</span>;
    }
  };

  return (
    <div className="px-5 pb-24">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
        {showViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs font-semibold text-[#3B5BF5] hover:underline"
          >
            View All
          </button>
        )}
      </div>

      {tasks.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-gray-400 text-sm">No tasks scheduled for this day.</p>
          <p className="text-xs text-gray-400 mt-1">Tap the '+' button below to add one!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => {
            const isCompleted = task.status === "Completed";
            const isSwiped = swipedTaskId === task._id;

            return (
              <div
                key={task._id}
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(e, task._id)}
                className="relative overflow-hidden rounded-2xl transition-all duration-200"
              >
                {/* Swipe Left Background Action */}
                <div className="absolute inset-y-0 right-0 w-24 bg-red-500 text-white flex items-center justify-center gap-1 font-medium text-xs rounded-r-2xl">
                  <button
                    onClick={() => {
                      onDeleteTask(task._id);
                      setSwipedTaskId(null);
                    }}
                    className="w-full h-full flex flex-col items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4 mb-0.5" />
                    <span>Delete</span>
                  </button>
                </div>

                {/* Main Task Card */}
                <div
                  className={`relative bg-white border border-gray-100 p-4 rounded-2xl flex items-center justify-between shadow-xs transition-transform duration-200 ${
                    isSwiped ? "-translate-x-24" : "translate-x-0"
                  }`}
                >
                  {/* Left: Custom Checkbox + Task Title */}
                  <div className="flex items-start gap-3.5 flex-1 pr-2">
                    <button
                      onClick={() => onToggleStatus(task._id)}
                      className={`w-5 h-5 mt-0.5 rounded-[6px] border flex items-center justify-center transition-all duration-200 ${
                        isCompleted
                          ? "bg-[#3B5BF5] border-[#3B5BF5] text-white shadow-xs"
                          : "border-blue-400 hover:border-[#3B5BF5] bg-transparent"
                      }`}
                    >
                      {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>

                    <div className="flex-1">
                      <p
                        onClick={() => onToggleStatus(task._id)}
                        className={`text-sm font-medium leading-snug cursor-pointer select-none transition-colors ${
                          isCompleted
                            ? "line-through text-gray-400"
                            : "text-gray-800 hover:text-black"
                        }`}
                      >
                        {task.title}
                      </p>

                      {/* Optional Time & Priority Meta */}
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        {(task.startTime || task.endTime) && (
                          <div className="flex items-center gap-1 text-[11px] text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>
                              {task.startTime}
                              {task.endTime ? ` - ${task.endTime}` : ""}
                            </span>
                          </div>
                        )}
                        {task.priority && getPriorityBadge(task.priority)}
                      </div>
                    </div>
                  </div>

                  {/* Right Actions: Delete & Edit icons matching Figma */}
                  <div className="flex items-center gap-2 text-gray-300">
                    <button
                      onClick={() => onDeleteTask(task._id)}
                      aria-label="Delete task"
                      className="p-1.5 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                    </button>
                    <button
                      onClick={() => onEditTask(task)}
                      aria-label="Edit task"
                      className="p-1.5 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4 text-gray-400 hover:text-[#3B5BF5]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

