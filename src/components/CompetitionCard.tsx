import React, { useState } from "react";
import * as Icons from "lucide-react";
import { Competition } from "../types";
import { ChevronDown, ChevronUp, Trophy, Calendar, Users, FileText, ArrowRight } from "lucide-react";
import { getNeonStyle } from "../utils/theme";

interface CompetitionCardProps {
  competition: Competition;
  formLink: string;
}

export const CompetitionCard: React.FC<CompetitionCardProps> = ({ competition, formLink }) => {
  const [showFullRules, setShowFullRules] = useState(false);
  const neon = getNeonStyle(competition.category);

  // Dynamically resolve the Lucide icon from iconName string
  const getIcon = (name: string, extraClass: string) => {
    const IconComponent = (Icons as any)[name];
    if (IconComponent) {
      return <IconComponent className={`w-3.5 h-3.5 ${extraClass}`} />;
    }
    return <Icons.HelpCircle className={`w-3.5 h-3.5 ${extraClass}`} />;
  };

  return (
    <div
      id={`card-${competition.id}`}
      className={`relative overflow-hidden rounded-2xl developer-glass p-5 md:p-6 flex flex-col justify-between developer-glass-hover shadow-lg border transition-all duration-300 ${neon.borderPanel} ${neon.glowHover}`}
    >
      {/* Visual Accent Sticker */}
      <div className={`absolute -top-12 -right-12 w-32 h-32 opacity-5 rounded-full blur-2xl -z-10 pointer-events-none bg-white`}></div>

      <div>
        {/* Header Block: Category & Title */}
        <div className="flex items-center justify-between gap-3 mb-3.5">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-accent font-extrabold uppercase tracking-[0.12em] border ${neon.borderBadge} ${neon.bgBadge} ${neon.text}`}
          >
            {getIcon(competition.iconName, neon.text)}
            {competition.category}
          </span>
          <span className={`text-[9px] font-mono uppercase tracking-[0.15em] text-slate-300 font-bold bg-slate-950/80 border ${neon.borderPanel} px-2.5 py-1 rounded`}>
            {competition.teamSize}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-accent font-bold text-white tracking-tight mb-2.5">
          {competition.title}
        </h3>

        <p className="text-sm text-slate-300 leading-relaxed font-normal mb-5.5">
          {competition.description}
        </p>

        {/* Structural Info Grid */}
        <div className={`grid grid-cols-1 xs:grid-cols-2 gap-3 mb-5.5 p-3.5 bg-slate-950/40 border ${neon.borderPanel} rounded-xl`}>
          <div className="space-y-1">
            <span className="text-[9px] font-accent text-slate-400 uppercase tracking-[0.18em] block font-bold">
              Eligibility
            </span>
            <span className={`text-xs font-semibold text-slate-200 flex items-center gap-1.5`}>
              <Calendar className={`w-3.5 h-3.5 ${neon.text}`} />
              {competition.eligibility}
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-accent text-slate-400 uppercase tracking-[0.18em] block font-bold">
              School Team Size
            </span>
            <span className={`text-xs font-semibold text-slate-200 flex items-center gap-1.5`}>
              <Users className={`w-3.5 h-3.5 ${neon.text}`} />
              {competition.teamSize}
            </span>
          </div>
        </div>

        {/* Selection Protocol Panel */}
        <div className={`mb-5.5 border-l-2 ${neon.borderActive} pl-3.5`}>
          <h4 className={`text-xs font-accent ${neon.text} uppercase tracking-[0.12em] font-extrabold mb-1.5 flex items-center gap-1.5`}>
            <Trophy className={`w-3.5 h-3.5 ${neon.text}`} />
            SNS Selection Protocol
          </h4>
          <p className="text-xs font-medium text-slate-300 leading-relaxed">
            {competition.selectionMethod}
          </p>
        </div>

        {/* Collapsible Rules List */}
        <div className="mt-2 mb-6">
          <button
            id={`toggle-rules-${competition.id}`}
            onClick={() => setShowFullRules(!showFullRules)}
            className={`flex items-center gap-1.5 text-xs font-accent font-bold tracking-wide text-slate-400 hover:${neon.text} transition-colors cursor-pointer`}
          >
            {showFullRules ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                Hide Competition Rules
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                Show Competition Rules & Guidelines
              </>
            )}
          </button>

          {showFullRules && (
            <div className={`mt-3 p-3.5 ${neon.bgPanel} border ${neon.borderPanel} rounded-lg animate-fadeIn`}>
              <h5 className="text-[10px] font-accent font-extrabold text-slate-300 uppercase tracking-[0.12em] mb-2.5 flex items-center gap-1.5">
                <FileText className={`w-3.5 h-3.5 ${neon.text}`} />
                Official HALOCON DPS Rules:
              </h5>
              <ul className="space-y-2">
                {competition.rules.map((rule, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5 leading-relaxed font-sans">
                    <span className={`${neon.text} font-bold mt-0.5`}>•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Button Tray */}
      <div className={`pt-3.5 border-t ${neon.borderPanel} flex flex-col xs:flex-row gap-2 mt-auto`}>
        <a
          id={`apply-btn-${competition.id}`}
          href={formLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex-1 ${neon.btnBg} text-white font-accent font-bold text-xs uppercase tracking-[0.15em] py-3 px-4 rounded-xl ${neon.btnShadow} transition-all duration-150 flex items-center justify-center gap-2 border ${neon.borderBadge} cursor-pointer text-center justify-center`}
        >
          <span>Apply for Selection</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
};
