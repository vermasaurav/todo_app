import React from "react";
import { ArrowRight, Calendar, CheckSquare, XSquare } from "lucide-react";

export default function Onboarding({ onGetStarted }) {
  return (
    <div className="w-full min-h-screen select-none">
      {/* ============================================================== */}
      {/* 💻 DESKTOP & TABLET VIEW (md: and above) - Full-Width Web Hero */}
      {/* ============================================================== */}
      <div className="hidden md:flex min-h-screen w-full bg-gradient-to-br from-[#3B5BF5] via-[#2E49D3] to-[#1E38B3] items-center justify-center relative overflow-hidden text-white p-8 lg:p-16">
        {/* Decorative Wave SVGs in corners */}
        <div className="absolute top-10 left-10 pointer-events-none opacity-40">
          <svg width="120" height="90" viewBox="0 0 80 64" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 4,8  L 16,18 L 28,8  L 40,18 L 52,8  L 64,18 L 76,8" />
            <path d="M 4,22 L 16,32 L 28,22 L 40,32 L 52,22 L 64,32 L 76,22" />
            <path d="M 4,36 L 16,46 L 28,36 L 40,46 L 52,36 L 64,46 L 76,36" />
            <path d="M 4,50 L 16,60 L 28,50 L 40,60 L 52,50 L 64,60 L 76,50" />
          </svg>
        </div>

        <div className="absolute bottom-10 right-10 pointer-events-none opacity-30">
          <svg width="140" height="100" viewBox="0 0 80 64" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 4,8  L 16,18 L 28,8  L 40,18 L 52,8  L 64,18 L 76,8" />
            <path d="M 4,22 L 16,32 L 28,22 L 40,32 L 52,22 L 64,32 L 76,22" />
            <path d="M 4,36 L 16,46 L 28,36 L 40,46 L 52,36 L 64,46 L 76,36" />
            <path d="M 4,50 L 16,60 L 28,50 L 40,60 L 52,50 L 64,60 L 76,50" />
          </svg>
        </div>

        {/* Ambient Glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />

        {/* Hero Section Grid (Left: Pitch & CTA, Right: Live App Preview Mockup) */}
        <div className="max-w-7xl w-full mx-auto grid grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column (Pitch) */}
          <div className="col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-md text-xs font-semibold text-blue-100">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Weekly Task & Progress Manager</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
              Manage What <br />
              <span className="text-blue-200 underline decoration-white/30 decoration-wavy">To Do</span>
            </h1>

            <p className="text-lg text-blue-100 font-normal leading-relaxed max-w-xl">
              The best way to manage what you have to do, don't forget your plans. Organize tasks by Monday–Sunday weeks, track visual progress, and boost productivity effortlessly.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-2 gap-3 pt-2 max-w-lg">
              <div className="flex items-center gap-2.5 text-sm text-blue-100 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur-xs border border-white/10">
                <Calendar className="w-4 h-4 text-white" />
                <span>Monday–Sunday Weeks</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-blue-100 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur-xs border border-white/10">
                <CheckSquare className="w-4 h-4 text-white" />
                <span>Visual Progress Cards</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={onGetStarted}
                className="bg-white hover:bg-blue-50 active:scale-[0.98] text-[#3B5BF5] px-9 py-4 rounded-2xl font-bold text-base shadow-2xl shadow-blue-900/40 inline-flex items-center gap-3 transition-all duration-200 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Right Column: Live App Preview Widget */}
          <div className="col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl text-gray-900 border border-white/30 transform hover:-translate-y-1 transition-transform duration-300">
              {/* Widget Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="font-bold text-base text-gray-900">Weekly Progress</h3>
                  <p className="text-xs text-gray-400">Monday - Sunday</p>
                </div>
                <span className="text-xs font-bold text-[#3B5BF5] bg-blue-50 px-2.5 py-1 rounded-lg">
                  86% Done
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
                <div className="w-[86%] h-full bg-[#1E3A8A] rounded-full"></div>
              </div>

              {/* 2 Metric Cards */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-[#EEF2FF] p-3 rounded-2xl border border-blue-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700">
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>Complete</span>
                  </div>
                  <div className="text-2xl font-extrabold text-gray-900 mt-2">50</div>
                </div>

                <div className="bg-[#FEF2F2] p-3 rounded-2xl border border-red-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-red-600">
                    <XSquare className="w-3.5 h-3.5" />
                    <span>Pending</span>
                  </div>
                  <div className="text-2xl font-extrabold text-gray-900 mt-2">08</div>
                </div>
              </div>

              {/* Sample Task Items */}
              <div className="mt-4 space-y-2">
                <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between text-xs font-semibold text-gray-800">
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-[#3B5BF5] text-white flex items-center justify-center text-[10px]">✓</span>
                    Finishing Wireframe
                  </span>
                  <span className="text-gray-400 text-[10px]">09:00 AM</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between text-xs font-semibold text-gray-800">
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded border border-blue-400"></span>
                    Meeting with team
                  </span>
                  <span className="text-gray-400 text-[10px]">01:30 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 📱 MOBILE VIEW (< md) - Exact 1:1 Figma Screen 1 Mockup        */}
      {/* ============================================================== */}
      <div className="md:hidden h-screen h-[100dvh] max-h-[100dvh] w-full bg-[#3B5BF5] flex flex-col justify-between relative overflow-hidden">
        {/* Top/Middle Blue Area */}
        <div className="flex-1 relative flex items-center justify-center min-h-0 overflow-hidden px-6">
          {/* Soft Translucent Circle Accent in Top Right */}
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/10 pointer-events-none" />

          {/* Top-Left Zigzag Pattern */}
          <div className="absolute top-8 left-6 pointer-events-none">
            <svg width="72" height="58" viewBox="0 0 80 64" fill="none" stroke="rgba(255, 255, 255, 0.28)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 4,8  L 16,18 L 28,8  L 40,18 L 52,8  L 64,18 L 76,8" />
              <path d="M 4,22 L 16,32 L 28,22 L 40,32 L 52,22 L 64,32 L 76,22" />
              <path d="M 4,36 L 16,46 L 28,36 L 40,46 L 52,36 L 64,46 L 76,36" />
              <path d="M 4,50 L 16,60 L 28,50 L 40,60 L 52,50 L 64,60 L 76,50" />
            </svg>
          </div>

          {/* Bottom-Right Zigzag Pattern */}
          <div className="absolute bottom-6 right-6 pointer-events-none">
            <svg width="72" height="58" viewBox="0 0 80 64" fill="none" stroke="rgba(255, 255, 255, 0.28)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 4,8  L 16,18 L 28,8  L 40,18 L 52,8  L 64,18 L 76,8" />
              <path d="M 4,22 L 16,32 L 28,22 L 40,32 L 52,22 L 64,32 L 76,22" />
              <path d="M 4,36 L 16,46 L 28,36 L 40,46 L 52,36 L 64,46 L 76,36" />
              <path d="M 4,50 L 16,60 L 28,50 L 40,60 L 52,50 L 64,60 L 76,50" />
            </svg>
          </div>

          {/* Center Check Icon */}
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-white/12 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-inner relative z-10">
            <svg className="w-9 h-9 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Bottom White Card */}
        <div className="shrink-0 bg-white rounded-t-[32px] sm:rounded-t-[36px] px-6 sm:px-8 pt-6 sm:pt-7 pb-8 sm:pb-9 shadow-2xl relative z-20 flex flex-col">
          <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#111827] tracking-tight leading-tight">
            Manage What To Do
          </h1>

          <p className="text-gray-500 text-xs sm:text-sm mt-2 sm:mt-2.5 leading-relaxed">
            The best way to manage what you have to do, don't forget your plans
          </p>

          <button
            onClick={onGetStarted}
            className="mt-6 sm:mt-7 w-full bg-[#3B5BF5] hover:bg-[#2E49D3] active:scale-[0.98] text-white py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base shadow-xl shadow-blue-500/25 transition-all duration-200 text-center cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
