import React from "react";
import { X, Calendar, Clock, Tag, CheckCircle2, Circle, Edit3, Trash2 } from "lucide-react";

export default function TaskDetailModal({
  isOpen,
  task,
  onClose,
  onEdit,
  onToggleStatus,
  onDelete,
}) {
  if (!isOpen || !task) return null;

  const isCompleted = task.status === "Completed";

  const formattedDate = task.date
    ? new Date(task.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No date specified";

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-50 text-red-600 border-red-200";
      case "Medium":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "Low":
      default:
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                isCompleted
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-blue-50 text-blue-700 border-blue-200"
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <Circle className="w-3.5 h-3.5" />
              )}
              {isCompleted ? "Completed" : "In Progress"}
            </span>

            {task.priority && (
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full border ${getPriorityStyle(
                  task.priority
                )}`}
              >
                {task.priority} Priority
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-6 space-y-6 overflow-y-auto">
          {/* Title */}
          <div>
            <h2
              className={`text-xl sm:text-2xl font-bold leading-tight ${
                isCompleted ? "line-through text-gray-400" : "text-gray-900"
              }`}
            >
              {task.title}
            </h2>
          </div>

          {/* Date & Time Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-gray-50/80 p-4 rounded-2xl border border-gray-100">
            {/* Scheduled Date */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-[#3B5BF5] shrink-0 mt-0.5">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                  Date
                </span>
                <span className="text-sm font-semibold text-gray-800">{formattedDate}</span>
              </div>
            </div>

            {/* Time Frame */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-[#3B5BF5] shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                  Time
                </span>
                <span className="text-sm font-semibold text-gray-800">
                  {task.startTime || "Anytime"}
                  {task.endTime ? ` - ${task.endTime}` : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
              Description
            </span>
            {task.description ? (
              <div className="bg-gray-50 rounded-2xl p-4 text-sm text-gray-700 leading-relaxed border border-gray-100 whitespace-pre-wrap">
                {task.description}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic bg-gray-50 p-4 rounded-2xl border border-gray-100">
                No description provided for this task.
              </p>
            )}
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
          {/* Toggle status action */}
          <button
            onClick={() => {
              onToggleStatus(task._id);
            }}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
              isCompleted
                ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                : "bg-[#3B5BF5] border-[#3B5BF5] text-white hover:bg-[#2E49D3] shadow-sm"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? "Mark In Progress" : "Mark Completed"}</span>
          </button>

          <div className="flex items-center gap-2 ml-auto">
            {/* Edit button */}
            <button
              onClick={() => {
                onClose();
                onEdit(task);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-[#3B5BF5] transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>

            {/* Delete button */}
            <button
              onClick={() => {
                onDelete(task._id);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
