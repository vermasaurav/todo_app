import React from "react";
import { Settings, Search, Bell, Plus, CheckCircle2, X } from "lucide-react";

export default function Header({
  searchQuery,
  onSearchChange,
  onOpenSearchModal,
  onOpenCreateModal,
  onShowOnboarding,
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================== */}
        {/* 💻 DESKTOP NAVBAR (Visible on md: and above)                  */}
        {/* ============================================================== */}
        <div className="hidden md:flex items-center justify-between h-16 gap-4">
          {/* Logo & App Title */}
          <div
            onClick={onShowOnboarding}
            className="flex items-center gap-3 cursor-pointer group"
            title="Click to view Welcome Screen"
          >
            <div className="w-10 h-10 rounded-xl bg-[#3B5BF5] flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight group-hover:text-[#3B5BF5] transition-colors">
                Todo List App
              </h1>
              <p className="text-[11px] text-gray-400">
                Weekly progress & task scheduler
              </p>
            </div>
          </div>

          {/* Center Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search tasks by title, description..."
                className="w-full bg-gray-50 border border-gray-200/80 rounded-xl pl-10 pr-9 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#3B5BF5] focus:ring-2 focus:ring-blue-100 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  aria-label="Clear search"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCreateModal}
              className="inline-flex items-center gap-2 bg-[#3B5BF5] hover:bg-[#2E49D3] active:scale-[0.98] text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md shadow-blue-500/20 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Task</span>
            </button>

            <button
              onClick={onShowOnboarding}
              title="View Welcome Onboarding"
              className="text-xs font-semibold text-gray-500 hover:text-[#3B5BF5] hover:bg-blue-50 px-3 py-2 rounded-xl transition-colors"
            >
              Intro
            </button>

            <button
              aria-label="Settings"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>

            <button
              aria-label="Notifications"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors relative"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 📱 MOBILE HEADER (Visible on < md) - Exact Figma Screen 2 & 3 */}
        {/* ============================================================== */}
        <div className="md:hidden pt-3 pb-3">
          {/* Top Row: Settings (Left) & Notifications (Right) matching Figma */}
          <div className="flex items-center justify-between mb-3 px-1">
            <button
              aria-label="Settings"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-700" />
            </button>

            <button
              aria-label="Notifications"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors relative"
            >
              <Bell className="w-5 h-5 text-gray-700" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
          </div>

          {/* Clean Search Bar matching Figma Screen 2 */}
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for a task"
              className="w-full bg-gray-50 border border-gray-200/80 rounded-2xl pl-4 pr-10 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#3B5BF5] focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
            />
            {searchQuery ? (
              <button
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}
