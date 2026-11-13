import React, { useState } from "react";
import { Check, Trash2, Edit3, Clock, AlertCircle } from "lucide-react";

export default function TaskList({
  tasks = [],
  title = "Tasks Today",
  statusFilter,
  onStatusFilterChange,
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
        return (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">
            High
          </span>
        );
      case "Medium":
        return (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
            Medium
          </span>
        );
      case "Low":
      default:
        return (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
            Low
          </span>
        );
    }
  };

  // Filter tasks based on status tab
  const displayedTasks = tasks.filter((t) => {
    if (!statusFilter || statusFilter === "all") return true;
    if (statusFilter === "in_progress") return t.status !== "Completed";
    if (statusFilter === "completed") return t.status === "Completed";
    return true;
  });

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200/80 shadow-xs">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3">
        <div className="flex items-center gap-3">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">{title}</h3>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {displayedTasks.length}
          </span>
        </div>

        {/* Filter Pills & View All */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex rounded-xl bg-gray-100 p-0.5 text-xs font-medium text-gray-600">
            <button
              onClick={() => onStatusFilterChange("all")}
              className={`px-3 py-1 rounded-lg transition-all ${
                statusFilter === "all" ? "bg-white text-gray-900 shadow-2xs font-semibold" : "hover:text-gray-900"
              }`}
            >
              All
            </button>
            <button
              onClick={() => onStatusFilterChange("in_progress")}
              className={`px-3 py-1 rounded-lg transition-all ${
                statusFilter === "in_progress" ? "bg-white text-gray-900 shadow-2xs font-semibold" : "hover:text-gray-900"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => onStatusFilterChange("completed")}
              className={`px-3 py-1 rounded-lg transition-all ${
                statusFilter === "completed" ? "bg-white text-gray-900 shadow-2xs font-semibold" : "hover:text-gray-900"
              }`}
            >
              Completed
            </button>
          </div>

          {showViewAll && (
            <button
              onClick={onViewAll}
              className="text-xs font-semibold text-[#3B5BF5] hover:bg-blue-50 px-2.5 py-1 rounded-lg transition-colors ml-auto sm:ml-0"
            >
              View All
            </button>
          )}
        </div>
      </div>

      {/* Task List Items */}
      {displayedTasks.length === 0 ? (
        <div className="py-16 text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#3B5BF5] flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-6 h-6 opacity-60" />
          </div>
          <p className="text-gray-700 text-sm font-semibold">No tasks found</p>
          <p className="text-xs text-gray-400 mt-1">There are no tasks matching the selected filters or date.</p>
        </div>
      ) : (
        <div className="space-y-3 pt-4">
          {displayedTasks.map((task) => {
            const isCompleted = task.status === "Completed";
            const isSwiped = swipedTaskId === task._id;

            return (
              <div
                key={task._id}
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(e, task._id)}
                className="relative overflow-hidden rounded-2xl transition-all duration-200 group"
              >
                {/* Swipe Left Background Action (Mobile) */}
                <div className="absolute inset-y-0 right-0 w-24 bg-red-500 text-white flex items-center justify-center font-medium text-xs rounded-r-2xl sm:hidden">
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

                {/* Main Task Item Card */}
                <div
                  className={`relative bg-gray-50/70 hover:bg-gray-50 border border-gray-200/70 hover:border-gray-300/80 p-4 rounded-2xl flex items-center justify-between transition-all duration-200 ${
                    isSwiped ? "-translate-x-24" : "translate-x-0"
                  }`}
                >
                  {/* Left: Custom Checkbox & Title */}
                  <div className="flex items-start gap-3.5 flex-1 pr-3">
                    <button
                      onClick={() => onToggleStatus(task._id)}
                      className={`w-5 h-5 mt-0.5 rounded-[6px] border flex items-center justify-center transition-all duration-200 shrink-0 ${
                        isCompleted
                          ? "bg-[#3B5BF5] border-[#3B5BF5] text-white shadow-xs"
                          : "border-blue-400 hover:border-[#3B5BF5] bg-white"
                      }`}
                    >
                      {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <p
                        onClick={() => onToggleStatus(task._id)}
                        className={`text-sm font-semibold leading-snug cursor-pointer select-none transition-colors truncate sm:whitespace-normal ${
                          isCompleted
                            ? "line-through text-gray-400 font-normal"
                            : "text-gray-800 hover:text-black"
                        }`}
                      >
                        {task.title}
                      </p>

                      {task.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {task.description}
                        </p>
                      )}

                      {/* Time & Priority Badges */}
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        {(task.startTime || task.endTime) && (
                          <div className="flex items-center gap-1 text-[11px] font-medium text-gray-500 bg-white px-2 py-0.5 rounded-md border border-gray-200/60">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span>
                              {task.startTime}
                              {task.endTime ? ` - ${task.endTime}` : ""}
                            </span>
                          </div>
                        )}
                        {task.priority && getPriorityBadge(task.priority)}
                        {task.date && (
                          <span className="text-[11px] text-gray-400 hidden sm:inline">
                            {new Date(task.date).toLocaleDateString("default", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Action Icons (Edit / Delete) */}
                  <div className="flex items-center gap-1.5 text-gray-400 shrink-0">
                    <button
                      onClick={() => onEditTask(task)}
                      aria-label="Edit task"
                      title="Edit Task"
                      className="p-2 hover:text-[#3B5BF5] hover:bg-blue-50 rounded-xl transition-colors"
                    >
                      <Edit3 className="w-4 h-4 text-gray-400 hover:text-[#3B5BF5]" />
                    </button>
                    <button
                      onClick={() => onDeleteTask(task._id)}
                      aria-label="Delete task"
                      title="Delete Task"
                      className="p-2 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
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
