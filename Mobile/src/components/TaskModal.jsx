import React, { useState, useEffect } from "react";
import { X, Clock, Calendar } from "lucide-react";

export default function TaskModal({ isOpen, onClose, onSave, editingTask, initialDate }) {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setStartTime(editingTask.startTime || "");
      setEndTime(editingTask.endTime || "");
      setDate(
        editingTask.date
          ? new Date(editingTask.date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0]
      );
      setPriority(editingTask.priority || "Medium");
      setDescription(editingTask.description || "");
    } else {
      setTitle("");
      setStartTime("09:00 AM");
      setEndTime("11:00 AM");
      setDate(
        initialDate
          ? new Date(initialDate).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0]
      );
      setPriority("Medium");
      setDescription("");
    }
    setError("");
  }, [editingTask, initialDate, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task title is required");
      return;
    }
    if (!date) {
      setError("Date is required");
      return;
    }

    onSave({
      title: title.trim(),
      startTime,
      endTime,
      date: new Date(date).toISOString(),
      priority,
      description: description.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-[24px] shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 pt-6 pb-3 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">
            {editingTask ? "Edit Task" : "Add New Task"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4 overflow-y-auto no-scrollbar">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-medium border border-red-200">
              {error}
            </div>
          )}

          {/* Task Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              Task title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Doing Homework"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#3B5BF5] focus:ring-1 focus:ring-[#3B5BF5] transition-all"
            />
          </div>

          {/* Set Time (Start and Ends) */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              Set Time
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Clock className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="Start (09:00 AM)"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#3B5BF5]"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Clock className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  placeholder="Ends (11:00 AM)"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#3B5BF5]"
                />
              </div>
            </div>
          </div>

          {/* Set Date */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              Set Date *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Calendar className="w-4 h-4" />
              </div>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-[#3B5BF5]"
              />
            </div>
          </div>

          {/* Priority Selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              Priority
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Low", "Medium", "High"].map((p) => {
                const isActive = priority === p;
                return (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                      isActive
                        ? "bg-[#3B5BF5] border-[#3B5BF5] text-white shadow-xs"
                        : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              Description
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add Description"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#3B5BF5] resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#3B5BF5] hover:bg-[#2E49D3] active:scale-[0.98] text-white py-3.5 rounded-2xl font-semibold text-sm shadow-md shadow-blue-500/25 transition-all"
            >
              {editingTask ? "Save Changes" : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

