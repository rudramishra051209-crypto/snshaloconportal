import React, { useState } from "react";
import { Competition, Applicant } from "../types";
import { Search, Loader2, AlertCircle, Calendar, CheckCircle2, RefreshCw, Bookmark, MessageSquare } from "lucide-react";

interface StatusCheckProps {
  applicants: Applicant[];
  competitions: Competition[];
}

export const StatusCheck: React.FC<StatusCheckProps> = ({ applicants, competitions }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<Applicant[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toUpperCase();
    if (!query) return;

    // Search by exact Admission Number OR Email
    const filtered = applicants.filter(
      (app) =>
        app.admissionNumber.toUpperCase() === query ||
        app.email.toUpperCase() === query
    );
    setResults(filtered);
    setSearched(true);
  };

  const getCompTitle = (compId: string) => {
    return competitions.find((c) => c.id === compId)?.title || "HALOCON Competition";
  };

  const getStatusBadge = (status: Applicant["status"]) => {
    switch (status) {
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold text-amber-400 bg-amber-950/30 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            PENDING EVALUATION
          </span>
        );
      case "Shortlisted":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold text-indigo-400 bg-indigo-950/30 border border-indigo-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
            SHORTLISTED FOR INTERVIEW
          </span>
        );
      case "Selected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold text-emerald-400 bg-emerald-950/30 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            SELECTED FOR SCHOOL TEAM
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold text-slate-400 bg-slate-900 border border-slate-850">
            SELECTION CONCLUDED
          </span>
        );
    }
  };

  const getStatusDescription = (status: Applicant["status"]) => {
    switch (status) {
      case "Pending":
        return "The SNS Selection Board has received your application pitch. We are currently evaluating admission details, academic clearance, and technical portfolios.";
      case "Shortlisted":
        return "Congratulations! You have cleared the preliminary portfolio round. Please report to the computer science lab as per the instructions in your email/WhatsApp for a quick screening or quiz.";
      case "Selected":
        return "Incredible! You have been officially selected to represent St. Norbert School at HALOCON DPS. The coordinators will contact you soon with the official registration slips.";
      case "Rejected":
        return "The selection panel has concluded review for this event. We highly appreciate your initiative! We encourage you to refine your skills and pitch again for the next technical symposium.";
    }
  };

  return (
    <div className="developer-glass rounded-2xl p-6 md:p-8 max-w-2xl mx-auto shadow-lg border border-slate-800">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-950/40 border border-indigo-500/20 text-indigo-400 rounded-lg">
          <Bookmark className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-sans font-bold text-white tracking-tight">
            Check Selection Status
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            Query the St. Norbert selection ledger using your Admission Number or School Email.
          </p>
        </div>
      </div>

      {/* Search Input Form */}
      <form onSubmit={handleSearch} className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              id="search-status-query"
              type="text"
              required
              placeholder="Enter Admission No (e.g. SNS/2026/145) or Email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#0a0f1d]/70 border border-slate-800 rounded-xl text-sm font-semibold text-white placeholder-slate-600 focus:border-indigo-500 focus:bg-[#070b14] outline-none transition-all focus:ring-1 focus:ring-indigo-500/20"
            />
            <Search className="absolute left-4 top-3.5 text-slate-500 w-5 h-5" />
          </div>
          <button
            id="run-search-btn"
            type="submit"
            className="sm:w-32 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl border border-indigo-500/20 shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            Search
          </button>
        </div>

        <p className="text-[10px] text-slate-400 font-mono text-center">
          * Admission numbers are in the format: <span className="font-bold text-indigo-400">SNS/YEAR/NUMBER</span>
        </p>
      </form>

      {/* Results Rendering Section */}
      {searched ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              // Search Results ({results.length})
            </h3>
            <button
              id="clear-search-btn"
              type="button"
              onClick={() => {
                setSearched(false);
                setSearchQuery("");
                setResults([]);
              }}
              className="text-xs font-mono font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              Reset Query
            </button>
          </div>

          {results.length > 0 ? (
            <div className="space-y-6">
              {results.map((app) => (
                <div
                  key={app.id}
                  className="bg-[#0c1222]/80 border border-slate-800 hover:border-indigo-500/20 rounded-xl p-5 md:p-6 space-y-4 transition-all shadow-sm"
                >
                  {/* Top line: Competition Name and Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-lg font-sans font-bold text-white leading-tight">
                        {getCompTitle(app.competitionId)}
                      </h4>
                      <p className="text-xs text-slate-400 font-medium font-mono mt-1">
                        Applied on: {new Date(app.submittedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="flex-shrink-0">{getStatusBadge(app.status)}</div>
                  </div>

                  {/* Status explanation */}
                  <div className="p-3 bg-slate-950/80 border border-slate-900 rounded-lg text-xs text-slate-300 leading-relaxed font-mono">
                    <span className="font-bold text-indigo-400 block mb-1 font-mono">// Status Guidance:</span>
                    {getStatusDescription(app.status)}
                  </div>

                  {/* Administrator Feedback */}
                  {app.adminFeedback && (
                    <div className="p-3.5 bg-indigo-950/40 border border-dashed border-indigo-500/20 rounded-lg space-y-1.5">
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide flex items-center gap-1.5 font-mono">
                        <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                        Coordinator Note:
                      </span>
                      <p className="text-xs italic text-slate-200 font-medium font-sans">
                        &ldquo;{app.adminFeedback}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Applicant Details Recap */}
                  <div className="border-t border-dashed border-slate-800 pt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-slate-400 font-mono">
                    <span>Candidate: <strong className="text-white">{app.fullName}</strong></span>
                    <span>•</span>
                    <span>Class: <strong className="text-white">{app.grade} - {app.section}</strong></span>
                    <span>•</span>
                    <span>Skill Rating: <strong className="text-indigo-400">{app.skillLevel}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-slate-950/40 rounded-xl border border-slate-800/80">
              <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
              <h4 className="text-sm font-sans font-bold text-white">No Applications Found</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1 leading-relaxed font-mono">
                No selection entries match &ldquo;<strong className="text-rose-400 font-mono">{searchQuery}</strong>&rdquo;. Make sure your admission code is exact (e.g. SNS/2026/145).
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-6 bg-slate-950/40 border border-slate-800 rounded-xl p-4">
          <Calendar className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
          <h4 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
            Evaluation in Progress
          </h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 font-mono">
            Shortlisted candidates are required to submit their mock screening solutions within 24 hours of notification. Keep checking this portal for live team placement updates.
          </p>
        </div>
      )}
    </div>
  );
};
