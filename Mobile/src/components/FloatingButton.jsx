import React from "react";
import { Plus } from "lucide-react";

export default function FloatingButton({ onClick }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <button
        onClick={onClick}
        aria-label="Add New Task"
        className="w-14 h-14 rounded-full bg-[#3B5BF5] hover:bg-[#2E49D3] active:scale-95 text-white flex items-center justify-center shadow-xl shadow-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-200 border-2 border-white/80 cursor-pointer"
      >
        <Plus className="w-7 h-7 stroke-[2.5]" />
      </button>
    </div>
  );
}
