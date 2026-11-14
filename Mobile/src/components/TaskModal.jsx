import React, { useState, useEffect, useRef } from "react";
import { X, Clock, Calendar } from "lucide-react";

// Format 24h ("13:30") to 12h ("01:30 PM")
export const formatTo12Hour = (timeStr) => {
  if (!timeStr) return "";
  if (timeStr.includes("AM") || timeStr.includes("PM")) return timeStr;
  const parts = timeStr.split(":");
  if (parts.length < 2) return timeStr;
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1].slice(0, 2);
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  return `${formattedHours}:${minutes} ${ampm}`;
};

// Format 12h ("01:30 PM") to 24h ("13:30") for <input type="time" />
export const formatTo24Hour = (timeStr) => {
  if (!timeStr) return "";
  if (!timeStr.includes("AM") && !timeStr.includes("PM")) {
    return timeStr.slice(0, 5);
  }
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)?/i);
  if (!match) return "";
  let [_, h, m, ampm] = match;
  let hours = parseInt(h, 10);
  if (ampm) {
    if (ampm.toUpperCase() === "PM" && hours < 12) hours += 12;
    if (ampm.toUpperCase() === "AM" && hours === 12) hours = 0;
  }
  const hh = hours < 10 ? `0${hours}` : `${hours}`;
  return `${hh}:${m}`;
};

export default function TaskModal({ isOpen, onClose, onSave, editingTask, initialDate }) {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("11:00");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const startInputRef = useRef(null);
  const endInputRef = useRef(null);
  const dateInputRef = useRef(null);

  const openPicker = (ref) => {
    if (ref.current) {
      if (typeof ref.current.showPicker === "function") {
        try {
          ref.current.showPicker();
        } catch {
          ref.current.focus();
        }
      } else {
        ref.current.focus();
      }
    }
  };

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setStartTime(formatTo24Hour(editingTask.startTime) || "09:00");
      setEndTime(formatTo24Hour(editingTask.endTime) || "11:00");
      setDate(
        editingTask.date
          ? new Date(editingTask.date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0]
      );
      setPriority(editingTask.priority || "Medium");
      setDescription(editingTask.description || "");
    } else {
      setTitle("");
      setStartTime("09:00");
      setEndTime("11:00");
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
      startTime: formatTo12Hour(startTime),
      endTime: formatTo12Hour(endTime),
      date: new Date(date).toISOString(),
      priority,
      description: description.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              {editingTask ? "Edit Task" : "Add New Task"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {editingTask ? "Update existing task attributes" : "Schedule a new task for your week"}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 overflow-y-auto no-scrollbar">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 text-red-600 text-xs font-semibold border border-red-200">
              {error}
            </div>
          )}

          {/* Task Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Task title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Finishing Wireframe"
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#3B5BF5] focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50/50 focus:bg-white"
            />
          </div>

          {/* Set Time (Start and Ends) with Clickable Clock */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Set Time (Clock Picker)
              </label>
              {(startTime || endTime) && (
                <span className="text-[11px] font-semibold text-[#3B5BF5] bg-blue-50 px-2.5 py-0.5 rounded-full">
                  {formatTo12Hour(startTime)} {endTime ? ` - ${formatTo12Hour(endTime)}` : ""}
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {/* Start Time with Clock Icon */}
              <div
                onClick={() => openPicker(startInputRef)}
                className="relative cursor-pointer group bg-gray-50 hover:bg-gray-100/80 border border-gray-200 rounded-2xl p-2.5 flex items-center gap-2.5 transition-all focus-within:bg-white focus-within:border-[#3B5BF5] focus-within:ring-2 focus-within:ring-blue-100"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#3B5BF5] flex items-center justify-center shrink-0 group-hover:bg-[#3B5BF5] group-hover:text-white transition-colors">
                  <Clock className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    Start Time
                  </span>
                  <input
                    ref={startInputRef}
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-gray-800 focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* End Time with Clock Icon */}
              <div
                onClick={() => openPicker(endInputRef)}
                className="relative cursor-pointer group bg-gray-50 hover:bg-gray-100/80 border border-gray-200 rounded-2xl p-2.5 flex items-center gap-2.5 transition-all focus-within:bg-white focus-within:border-[#3B5BF5] focus-within:ring-2 focus-within:ring-blue-100"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#3B5BF5] flex items-center justify-center shrink-0 group-hover:bg-[#3B5BF5] group-hover:text-white transition-colors">
                  <Clock className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    Ends Time
                  </span>
                  <input
                    ref={endInputRef}
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-gray-800 focus:outline-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Set Date with Calendar Icon */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Set Date <span className="text-red-500">*</span>
            </label>
            <div
              onClick={() => openPicker(dateInputRef)}
              className="relative cursor-pointer group bg-gray-50 hover:bg-gray-100/80 border border-gray-200 rounded-2xl p-2.5 flex items-center gap-2.5 transition-all focus-within:bg-white focus-within:border-[#3B5BF5] focus-within:ring-2 focus-within:ring-blue-100"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#3B5BF5] flex items-center justify-center shrink-0 group-hover:bg-[#3B5BF5] group-hover:text-white transition-colors">
                <Calendar className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  Scheduled Date
                </span>
                <input
                  ref={dateInputRef}
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-gray-800 focus:outline-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Priority Selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Priority
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {["Low", "Medium", "High"].map((p) => {
                const isActive = priority === p;
                return (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
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
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Description (Optional)
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add extra context, deliverables, or checklist notes..."
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#3B5BF5] focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50/50 focus:bg-white resize-none"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#3B5BF5] hover:bg-[#2E49D3] active:scale-[0.98] text-white py-3.5 rounded-2xl font-semibold text-sm shadow-md shadow-blue-500/25 transition-all cursor-pointer"
            >
              {editingTask ? "Save Changes" : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
