import React from "react";
// @ts-ignore
import logo from "../assets/images/school_logo.png";

export const Header: React.FC = () => {
  return (
    <header className="w-full relative z-10 select-none">
      {/* Sleek Futuristic Tech Accent Top Bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* Main Header Card with Elegant Slate-Blue Translucent Theme */}
        <div className="developer-glass rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden border border-indigo-500/15 shadow-lg">
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          {/* Logo & Branding */}
          <div className="flex items-start md:items-center gap-4 md:gap-5 relative z-10">
            {/* Official Logo of St. Norbert School (Indore) */}
            <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-white border border-indigo-500/20 rounded-xl shadow-md flex items-center justify-center p-1 overflow-hidden">
              <img
                src={logo}
                alt="St. Norbert School Logo"
                className="w-full h-full object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
 
            {/* School Titles */}
            <div className="space-y-2">
              <span className="text-[10px] md:text-xs font-accent font-semibold tracking-[0.25em] text-cyan-400 block uppercase">
                // ACADEMIC SELECTION HUB
              </span>
              <h1 id="main-title" className="text-2xl md:text-4xl font-display font-extrabold tracking-[0.12em] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 leading-none">
                ST. NORBERT SCHOOL
              </h1>
              <p className="text-xs md:text-sm font-accent text-slate-300 font-medium flex flex-wrap items-center gap-x-2 gap-y-1.5 pt-0.5">
                <span>Selection Portal for</span>
                <span className="inline-flex items-center gap-1 font-mono font-bold text-cyan-300 bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-500/20 shadow-inner">
                  HALOCON 2026
                </span>
                <span className="text-indigo-500/60">•</span>
                <span className="text-slate-400 font-normal italic font-sans">Organized by Delhi Public School (DPS)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
