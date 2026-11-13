import React from "react";
import { Settings, Search, Bell, Plus, CheckCircle2 } from "lucide-react";

export default function Header({
  searchQuery,
  onSearchChange,
  onOpenSearchModal,
  onOpenCreateModal,
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & App Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3B5BF5] flex items-center justify-center text-white shadow-md shadow-blue-500/25">
              <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                Manage What To Do
              </h1>
              <p className="text-[11px] text-gray-400 hidden sm:block">
                Weekly progress & task scheduler
              </p>
            </div>
          </div>

          {/* Center Search Bar (Visible on Tablet/Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search tasks by title or description..."
                className="w-full bg-gray-50 border border-gray-200/80 rounded-xl pl-10 pr-4 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#3B5BF5] focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>

          {/* Right Action Icons & Primary "Add Task" Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Trigger Icon */}
            <button
              onClick={onOpenSearchModal}
              aria-label="Search"
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Desktop Quick "Add Task" Button */}
            <button
              onClick={onOpenCreateModal}
              className="hidden sm:inline-flex items-center gap-2 bg-[#3B5BF5] hover:bg-[#2E49D3] active:scale-[0.98] text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md shadow-blue-500/20 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Task</span>
            </button>

            {/* Settings Button */}
            <button
              aria-label="Settings"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>

            {/* Notification Bell with Badge */}
            <button
              aria-label="Notifications"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors relative"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Row (Only on small screens < md) */}
        <div className="md:hidden pb-3">
          <div
            onClick={onOpenSearchModal}
            className="w-full bg-gray-50 border border-gray-200/80 rounded-xl px-4 py-2.5 flex items-center justify-between cursor-pointer text-gray-400 text-sm shadow-2xs"
          >
            <span>{searchQuery || "Search for a task..."}</span>
            <Search className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
