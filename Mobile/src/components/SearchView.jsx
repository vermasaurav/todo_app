import React, { useState } from "react";
import { ArrowLeft, Search, Check, Trash2, Edit3, X } from "lucide-react";

export default function SearchView({ onClose, tasks = [], onToggleStatus, onEditTask, onDeleteTask }) {
  const [keyword, setKeyword] = useState("");

  const filtered = tasks.filter((t) => {
    if (!keyword.trim()) return true;
    const q = keyword.toLowerCase();
    const inTitle = t.title && t.title.toLowerCase().includes(q);
    const inDesc = t.description && t.description.toLowerCase().includes(q);
    return inTitle || inDesc;
  });

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in fade-in duration-200">
      {/* Top Search Bar */}
      <div className="px-4 pt-6 pb-3 border-b border-gray-100 flex items-center gap-3">
        <button
          onClick={onClose}
          aria-label="Back"
          className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 relative">
          <input
            type="text"
            autoFocus
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search tasks..."
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-4 pr-10 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#3B5BF5]"
          />
          {keyword ? (
            <button
              onClick={() => setKeyword("")}
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

      {/* Results Count */}
      <div className="px-5 py-2.5 bg-gray-50/50 flex items-center justify-between text-xs text-gray-500 font-medium">
        <span>{filtered.length} {filtered.length === 1 ? "task" : "tasks"} found</span>
        {keyword && <span>Keyword: "{keyword}"</span>}
      </div>

      {/* Results List */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No tasks matching your query</p>
          </div>
        ) : (
          filtered.map((task) => {
            const isCompleted = task.status === "Completed";
            return (
              <div
                key={task._id}
                className="bg-white border border-gray-100 p-4 rounded-2xl flex items-center justify-between shadow-xs hover:border-gray-200 transition-all"
              >
                <div className="flex items-start gap-3.5 flex-1 pr-2">
                  <button
                    onClick={() => onToggleStatus(task._id)}
                    className={`w-5 h-5 mt-0.5 rounded-[6px] border flex items-center justify-center transition-all ${
                      isCompleted
                        ? "bg-[#3B5BF5] border-[#3B5BF5] text-white"
                        : "border-blue-400 bg-transparent"
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
                          : "text-gray-800"
                      }`}
                    >
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-400">
                  <button
                    onClick={() => onDeleteTask(task._id)}
                    aria-label="Delete task"
                    className="p-1.5 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onEditTask(task);
                    }}
                    aria-label="Edit task"
                    className="p-1.5 hover:text-[#3B5BF5] hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

