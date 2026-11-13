import React from "react";
import { Settings, Search, Bell } from "lucide-react";

export default function Header({ onOpenSearch }) {
  return (
    <div className="px-5 pt-6 pb-2">
      {/* Top action row */}
      <div className="flex items-center justify-between mb-4">
        <button 
          aria-label="Settings"
          className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Settings className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            aria-label="Search"
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            aria-label="Notifications"
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors relative"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Prominent Search Bar Input Box */}
      <div 
        onClick={onOpenSearch}
        className="w-full bg-gray-50 hover:bg-gray-100/80 border border-gray-200/80 rounded-2xl px-4 py-3 flex items-center justify-between cursor-pointer transition-colors shadow-sm"
      >
        <span className="text-gray-400 text-sm font-medium">Search for a task</span>
        <Search className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
}

