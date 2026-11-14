import React, { useState, useEffect } from "react";
import { ArrowLeft, Search, Check, Trash2, Edit3, X, Clock } from "lucide-react";

export default function SearchView({
  onClose,
  tasks = [],
  initialKeyword = "",
  onKeywordChange,
  onToggleStatus,
  onViewTask,
  onEditTask,
  onDeleteTask,
}) {
  const [keyword, setKeyword] = useState(initialKeyword || "");

  useEffect(() => {
    setKeyword(initialKeyword || "");
  }, [initialKeyword]);

  const handleInputChange = (val) => {
    setKeyword(val);
    if (onKeywordChange) onKeywordChange(val);
  };

  const filtered = tasks.filter((t) => {
    if (!keyword.trim()) return true;
    const q = keyword.trim().toLowerCase();
    const inTitle = t.title ? t.title.toLowerCase().includes(q) : false;
    const inDesc = t.description ? t.description.toLowerCase().includes(q) : false;
    return inTitle || inDesc;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start sm:items-center justify-center sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full sm:max-w-2xl h-full sm:h-auto sm:max-h-[85vh] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Search Bar */}
        <div className="px-4 sm:px-6 pt-5 pb-4 border-b border-gray-100 flex items-center gap-3">
          <button
            onClick={onClose}
            aria-label="Back"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              autoFocus
              value={keyword}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Search tasks by title, description..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#3B5BF5] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
            />
            {keyword ? (
              <button
                onClick={() => handleInputChange("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>

        {/* Results Count Banner */}
        <div className="px-6 py-2.5 bg-gray-50/70 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
          <span>{filtered.length} {filtered.length === 1 ? "task" : "tasks"} found</span>
          {keyword && <span>Keyword: <strong className="text-gray-800">"{keyword}"</strong></span>}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Search className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-semibold text-gray-600">No matching tasks found</p>
              <p className="text-xs text-gray-400 mt-1">Try another search keyword</p>
            </div>
          ) : (
            filtered.map((task) => {
              const isCompleted = task.status === "Completed";
              return (
                <div
                  key={task._id}
                  className="bg-gray-50/70 hover:bg-gray-50 border border-gray-200/70 hover:border-gray-300 p-4 rounded-2xl flex items-center justify-between shadow-2xs transition-all"
                >
                  <div className="flex items-start gap-3.5 flex-1 pr-3">
                    <button
                      onClick={() => onToggleStatus(task._id)}
                      className={`w-5 h-5 mt-0.5 rounded-[6px] border flex items-center justify-center transition-all ${
                        isCompleted
                          ? "bg-[#3B5BF5] border-[#3B5BF5] text-white"
                          : "border-blue-400 bg-white"
                      }`}
                    >
                      {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>

                    <div
                      onClick={() => {
                        onClose();
                        onViewTask && onViewTask(task);
                      }}
                      className="flex-1 min-w-0 cursor-pointer"
                    >
                      <p
                        className={`text-sm font-semibold leading-snug select-none transition-colors ${
                          isCompleted
                            ? "line-through text-gray-400 font-normal"
                            : "text-gray-800 hover:text-[#3B5BF5]"
                        }`}
                      >
                        {task.title}
                      </p>
                      {task.description && (
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                          {task.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-1.5 text-[11px] text-gray-400">
                        {task.startTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {task.startTime}
                          </span>
                        )}
                        {task.priority && (
                          <span className="font-semibold text-gray-600">• {task.priority}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-gray-400">
                    <button
                      onClick={() => {
                        onClose();
                        onEditTask(task);
                      }}
                      aria-label="Edit task"
                      className="p-2 hover:text-[#3B5BF5] hover:bg-blue-50 rounded-xl transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteTask(task._id)}
                      aria-label="Delete task"
                      className="p-2 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
