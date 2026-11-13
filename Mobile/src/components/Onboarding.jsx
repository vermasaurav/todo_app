import React from "react";

export default function Onboarding({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-[#3B5BF5] flex flex-col justify-between relative overflow-hidden">
      {/* Decorative Wave SVGs in top and background */}
      <div className="absolute top-12 left-6 opacity-30 pointer-events-none">
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none" stroke="white" strokeWidth="4">
          <path d="M 0,20 Q 30,0 60,20 T 120,20" />
          <path d="M 0,40 Q 30,20 60,40 T 120,40" />
          <path d="M 0,60 Q 30,40 60,60 T 120,60" />
        </svg>
      </div>
      <div className="absolute top-1/3 right-4 opacity-25 pointer-events-none">
        <svg width="100" height="70" viewBox="0 0 100 70" fill="none" stroke="white" strokeWidth="4">
          <path d="M 0,15 Q 25,0 50,15 T 100,15" />
          <path d="M 0,35 Q 25,20 50,35 T 100,35" />
          <path d="M 0,55 Q 25,40 50,55 T 100,55" />
        </svg>
      </div>

      {/* Top Space / Hero Art */}
      <div className="flex-1 flex items-center justify-center pt-24 px-8">
        <div className="w-28 h-28 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg">
          <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
      </div>

      {/* Bottom White Card */}
      <div className="bg-white rounded-t-[32px] px-8 pt-10 pb-12 shadow-2xl z-10 flex flex-col">
        <h1 className="text-[28px] font-bold text-gray-900 leading-tight tracking-tight">
          Manage What To Do
        </h1>
        <p className="text-gray-500 text-sm mt-3 leading-relaxed">
          The best way to manage what you have to do, don't forget your plans
        </p>

        <button
          onClick={onGetStarted}
          className="mt-8 w-full bg-[#3B5BF5] hover:bg-[#2E49D3] active:scale-[0.98] text-white py-4 rounded-2xl font-semibold text-base shadow-lg shadow-blue-500/25 transition-all duration-200"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

