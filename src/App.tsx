import React, { useState } from "react";
import { Header } from "./components/Header";
import { CompetitionCard } from "./components/CompetitionCard";
import { competitionsData } from "./competitionsData";
import { Calendar, School, PhoneCall, Mail, GraduationCap } from "lucide-react";

// Hardcoded Google Form links in code for each competition using standard example formats
// Updated: recoil now opens youtube.com as requested
const FORM_LINKS: Record<string, string> = {
  recoil: "https://youtube.com",
  encode: "https://docs.google.com/forms/d/e/1FAIpQLSd7-encode-programming/viewform",
  qurious: "https://docs.google.com/forms/d/e/1FAIpQLScY-qurious-trivia/viewform",
  monochrome: "https://docs.google.com/forms/d/e/1FAIpQLSdG-monochrome-photography/viewform",
  "pixel-perfect": "https://docs.google.com/forms/d/e/1FAIpQLScP-pixel-perfect-design/viewform",
  kinetiq: "https://docs.google.com/forms/d/e/1FAIpQLSfZ-kinetiq-artificial-intelligence/viewform",
  cinephila: "https://docs.google.com/forms/d/e/1FAIpQLSeK-cinephila-filmmaking/viewform",
};

export default function App() {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");

  // Get unique category list
  const categories = ["All", ...Array.from(new Set(competitionsData.map((c) => c.category)))];

  const filteredCompetitions = selectedCategoryFilter === "All"
    ? competitionsData
    : competitionsData.filter((c) => c.category === selectedCategoryFilter);

  return (
    <div className="min-h-screen bg-[#060b1e] text-slate-100 pb-16 font-sans relative overflow-x-hidden">
      {/* Elegant Cool Blue Gradient Background Orbs */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-indigo-950/20 via-[#060b1e]/70 to-transparent -z-20 pointer-events-none"></div>
      
      {/* Light Indigo grid pattern for academic tech aesthetic */}
      <div className="absolute inset-0 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] -z-30 pointer-events-none"></div>

      {/* Brand Header */}
      <Header />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 relative z-10">
        <div className="space-y-8 animate-fadeIn">
          
          {/* Quick Informative Info bar */}
          <div className="flex flex-wrap gap-4 p-4 bg-indigo-950/15 border border-indigo-500/15 rounded-xl justify-center sm:justify-between items-center text-[10px] tracking-[0.12em] text-cyan-300 font-accent uppercase">
            <span className="flex items-center gap-2 font-bold">
              <Calendar className="w-4 h-4 text-cyan-400" />
              Symposium: July 28 - 29, 2026
            </span>
            <span className="text-indigo-900/60 hidden sm:inline">|</span>
            <span className="flex items-center gap-2 font-bold">
              <School className="w-4 h-4 text-cyan-400" />
              Host Campus: Delhi Public School
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-[10px] font-accent font-extrabold text-cyan-400 uppercase tracking-[0.2em]">
                // Select Tryout Category ({filteredCompetitions.length})
              </h3>
              <span className="text-xs text-slate-400 font-sans font-medium">Filter to see specific competition requirements</span>
            </div>
            
            <div className="flex flex-wrap gap-1.5 p-1 bg-indigo-950/15 border border-indigo-500/10 rounded-xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-accent font-bold uppercase tracking-[0.12em] transition-all duration-200 cursor-pointer ${
                    selectedCategoryFilter === cat
                      ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md border border-indigo-400/30"
                      : "text-slate-400 hover:text-white hover:bg-indigo-950/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Details Panel - Slate-Blue Translucent Card with Cyan/Mint accents */}
          <section className="developer-glass rounded-2xl p-6 md:p-8 border border-indigo-500/15 relative overflow-hidden">
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
              <h3 className="text-xl md:text-2xl font-accent font-bold text-white tracking-wide flex items-center justify-center gap-2">
                <PhoneCall className="w-5 h-5 text-cyan-400" />
                Contact Details
              </h3>
              <p className="text-sm text-slate-300 font-normal max-w-xl mx-auto leading-relaxed">
                Have questions regarding the HALOCON syllabus, trial criteria, or Google Form submissions? Get in touch with our school coordinators.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              <div className="bg-indigo-950/15 border border-indigo-500/10 rounded-xl p-5 hover:border-indigo-500/25 transition-all">
                <h4 className="text-[9px] font-accent font-extrabold text-cyan-400 uppercase tracking-[0.2em] mb-2.5">
                  // Faculty Advisor
                </h4>
                <p className="text-lg font-accent font-bold text-white">Mr. Joseph Peter</p>
                <p className="text-xs text-slate-400 font-sans font-semibold mb-4">HOD, Department of Computer Science</p>
                
                <div className="space-y-2 text-xs text-slate-300 font-sans font-medium">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span className="text-slate-300 hover:text-white transition-colors">j.peter@stnorbertschool.edu.in</span>
                  </div>
                  <div className="flex items-center gap-2.5 pt-0.5">
                    <School className="w-4 h-4 text-cyan-400" />
                    <span>CS Department Office, Block A</span>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-950/15 border border-indigo-500/10 rounded-xl p-5 hover:border-indigo-500/25 transition-all">
                <h4 className="text-[9px] font-accent font-extrabold text-indigo-400 uppercase tracking-[0.2em] mb-2.5">
                  // Student Coordinator
                </h4>
                <p className="text-lg font-accent font-bold text-white">Adithya Vardhan</p>
                <p className="text-xs text-slate-400 font-sans font-semibold mb-4">President, SNS Tech Guild (Grade XII)</p>
                
                <div className="space-y-2 text-xs text-slate-300 font-sans font-medium">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span className="text-slate-300 hover:text-white transition-colors">techguild@stnorbertschool.edu.in</span>
                  </div>
                  <div className="flex items-center gap-2.5 pt-0.5">
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                    <span>St. Norbert School Campus</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Slate-Blue Translucent Glassmorphism Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompetitions.map((comp) => (
              <CompetitionCard
                key={comp.id}
                competition={comp}
                formLink={FORM_LINKS[comp.id] || "https://docs.google.com/forms"}
              />
            ))}
          </div>

        </div>
      </main>

      {/* Footer Branding */}
      <footer className="w-full mt-24 border-t border-indigo-950/30 pt-8 text-center px-4 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-accent text-xs tracking-wider">
          <div>
            <span className="font-medium text-slate-400">© 2026 St. Norbert School (SNS) Technology Guild. All Rights Reserved.</span>
          </div>
          <div className="flex gap-4 font-bold text-[10px] uppercase tracking-widest text-slate-400">
            <span className="hover:text-cyan-400 transition-colors cursor-pointer">DPS HALOCON Syllabus</span>
            <span className="text-indigo-950/80 font-normal">•</span>
            <span className="hover:text-cyan-400 transition-colors cursor-pointer">SNS Selection Protocol v1.4</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
