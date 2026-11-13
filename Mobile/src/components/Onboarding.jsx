import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function Onboarding({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-[#3B5BF5] flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Decorative Wave SVGs in top and background */}
      <div className="absolute top-12 left-10 opacity-30 pointer-events-none">
        <svg width="180" height="100" viewBox="0 0 120 80" fill="none" stroke="white" strokeWidth="4">
          <path d="M 0,20 Q 30,0 60,20 T 120,20" />
          <path d="M 0,40 Q 30,20 60,40 T 120,40" />
          <path d="M 0,60 Q 30,40 60,60 T 120,60" />
        </svg>
      </div>
      <div className="absolute bottom-12 right-10 opacity-25 pointer-events-none">
        <svg width="220" height="120" viewBox="0 0 100 70" fill="none" stroke="white" strokeWidth="4">
          <path d="M 0,15 Q 25,0 50,15 T 100,15" />
          <path d="M 0,35 Q 25,20 50,35 T 100,35" />
          <path d="M 0,55 Q 25,40 50,55 T 100,55" />
        </svg>
      </div>

      {/* Main Centered Container */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2">
        {/* Left Hero Graphic Section */}
        <div className="bg-gradient-to-br from-[#3B5BF5] to-[#1E38B3] p-10 flex flex-col justify-between text-white relative">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-sm tracking-wide uppercase">TaskFlow</span>
          </div>

          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg mb-6">
              <CheckCircle2 className="w-12 h-12 text-white stroke-[2.2]" />
            </div>
            <h2 className="text-2xl font-bold text-white leading-snug">
              Weekly Task Mastery
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm mt-2 max-w-xs">
              Organize Monday–Sunday schedules and track open vs. completed goals effortlessly.
            </p>
          </div>

          <div className="text-[11px] text-blue-200 text-center">
            MERN Stack Assignment • Responsive Web & Mobile
          </div>
        </div>

        {/* Right Action Section */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <span className="text-xs font-bold text-[#3B5BF5] tracking-wider uppercase mb-2">
            Welcome
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
            Manage What To Do
          </h1>
          <p className="text-gray-500 text-sm mt-3 leading-relaxed">
            The best way to manage what you have to do, don't forget your plans. Group your tasks by week, track progress visually, and stay productive every single day.
          </p>

          <div className="mt-8">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#3B5BF5] hover:bg-[#2E49D3] active:scale-[0.98] text-white px-8 py-4 rounded-2xl font-semibold text-base shadow-lg shadow-blue-500/25 transition-all duration-200"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
