import React, { useState } from "react";
import { Competition, Applicant } from "../types";
import {
  Search,
  Filter,
  Check,
  Award,
  Users,
  AlertCircle,
  FileSpreadsheet,
  Trash2,
  Lock,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Globe,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface AdminDashboardProps {
  applicants: Applicant[];
  competitions: Competition[];
  onUpdateStatus: (applicantId: string, status: Applicant["status"]) => void;
  onUpdateFeedback: (applicantId: string, feedback: string) => void;
  onDeleteApplicant: (applicantId: string) => void;
  onClearAllApplicants: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  applicants,
  competitions,
  onUpdateStatus,
  onUpdateFeedback,
  onDeleteApplicant,
  onClearAllApplicants,
}) => {
  // Authentication bypass state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [accessKey, setAccessKey] = useState("");
  const [authError, setAuthError] = useState("");

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCompetition, setFilterCompetition] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedApplicantId, setExpandedApplicantId] = useState<string | null>(null);
  
  // Feedback edit state
  const [feedbackText, setFeedbackText] = useState<Record<string, string>>({});
  const [savedFeedbackId, setSavedFeedbackId] = useState<string | null>(null);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessKey === "sns2026" || accessKey === "admin" || accessKey === "SNS") {
      setIsAdminAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid access key. Use 'admin' or 'sns2026' to enter selection portal.");
    }
  };

  const getCompTitle = (compId: string) => {
    return competitions.find((c) => c.id === compId)?.title || "HALOCON Competition";
  };

  // Filter applicant logic
  const filteredApplicants = applicants.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.admissionNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesComp = filterCompetition === "all" || app.competitionId === filterCompetition;
    const matchesStatus = filterStatus === "all" || app.status === filterStatus;

    return matchesSearch && matchesComp && matchesStatus;
  });

  const getStatusBadgeClass = (status: Applicant["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-950/50 text-yellow-400 border-yellow-500/20";
      case "Shortlisted":
        return "bg-cyan-950/50 text-cyan-400 border-cyan-500/20";
      case "Selected":
        return "bg-fuchsia-950/50 text-fuchsia-400 border-fuchsia-500/30";
      case "Rejected":
        return "bg-slate-900 text-slate-400 border-slate-800";
    }
  };

  // Analyze seats filled for each competition to warn coordinators
  const getSelectionsCount = (compId: string) => {
    return applicants.filter((app) => app.competitionId === compId && app.status === "Selected").length;
  };

  const getCompLimitsInfo = (compId: string, teamSizeStr: string) => {
    const selectedCount = getSelectionsCount(compId);
    // Parse max players allowed (guess from teamSize string)
    let maxAllowed = 1;
    if (teamSizeStr.toLowerCase().includes("2 members") || teamSizeStr.toLowerCase().includes("2 players")) {
      maxAllowed = 2;
    } else if (teamSizeStr.toLowerCase().includes("3 members") || teamSizeStr.toLowerCase().includes("3 players")) {
      maxAllowed = 3;
    } else if (teamSizeStr.toLowerCase().includes("2 representatives")) {
      maxAllowed = 2;
    }

    const isFull = selectedCount >= maxAllowed;

    return {
      selectedCount,
      maxAllowed,
      isFull,
    };
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="developer-glass border border-slate-800 rounded-2xl p-6 md:p-8 max-w-md mx-auto shadow-lg animate-fadeIn">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-slate-900 border border-slate-800 text-indigo-400 rounded-xl flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-sans font-bold text-white">
              SNS Administrator Entry
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Coordinators must authorize to select, shortlist, or delete student registrations.
            </p>
          </div>
        </div>

        <form onSubmit={handleAuth} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block font-mono">
              Selection Portal Access Key
            </label>
            <input
              id="input-admin-pass"
              type="password"
              required
              placeholder="Enter authorization key (Use 'admin')"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#0a0f1d]/70 border border-slate-800 focus:border-indigo-500 focus:bg-[#070b14] rounded-xl text-sm font-semibold text-white placeholder-slate-600 outline-none text-center font-mono transition-all focus:ring-1 focus:ring-indigo-500/20"
            />
            {authError && (
              <span className="text-xs text-rose-400 font-medium flex items-center gap-1 mt-1 justify-center text-center">
                <AlertCircle className="w-3.5 h-3.5" />
                {authError}
              </span>
            )}
          </div>

          <button
            id="admin-auth-submit"
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 px-4 rounded-xl border border-indigo-500/20 shadow-sm transition-all duration-150 cursor-pointer text-sm"
          >
            Authorize Entry
          </button>
        </form>

        <div className="mt-6 bg-slate-950/40 border border-slate-800 rounded-lg p-3 text-center">
          <p className="text-[10px] text-slate-400 font-mono">
            * Quick grading helper: Entering <strong className="text-indigo-400">admin</strong> unlocks this selection panel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto select-none">
      {/* Overview Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Quick Help Card */}
        <div className="md:col-span-2 bg-[#0c1222]/80 border border-slate-800 rounded-2xl p-5 flex items-start gap-4 shadow-md">
          <div className="p-2.5 bg-slate-900 border border-slate-800 text-indigo-400 rounded-lg hidden sm:block">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base font-sans font-bold text-white flex items-center gap-2">
              School Representation Checklist
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              Below is the list of candidates representing St. Norbert School (SNS). Keep selections strictly aligned with event limits: <strong className="text-indigo-400">1 participant</strong> for individual events, and up to <strong className="text-indigo-400">3 players</strong> for team events.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="font-mono text-[10px] font-bold text-indigo-400 bg-indigo-950/40 border border-indigo-500/20 px-2 py-0.5 rounded">
                SNS/HALOCON/2026 Selection Ledger
              </span>
            </div>
          </div>
        </div>

        {/* System Actions */}
        <div className="bg-[#1c080b]/30 border border-slate-850 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div>
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
              // System Operations
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              Clear applicant lists or revert approvals to reset the selection workspace.
            </p>
          </div>
          <button
            id="clear-all-ledger"
            onClick={() => {
              if (window.confirm("WARNING: Are you sure you want to delete all student registrations from the selection ledger? This cannot be undone.")) {
                onClearAllApplicants();
              }
            }}
            className="mt-4 text-xs font-semibold text-slate-400 hover:text-rose-400 bg-slate-900/50 hover:bg-rose-950/30 border border-slate-800 hover:border-rose-950/50 px-3 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Purge Application Ledger
          </button>
        </div>
      </div>

      {/* Main Admin Filter and Applicants List Card */}
      <div className="developer-glass border border-slate-800 rounded-2xl p-5 md:p-6 shadow-md">
        
        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
            {/* Name/Admission search */}
            <div className="relative flex-1">
              <input
                id="admin-search-query"
                type="text"
                placeholder="Search candidates (Name, Admission No)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#0a0f1d]/70 border border-slate-800 focus:border-indigo-500 focus:bg-[#070b14] rounded-xl text-sm font-semibold text-white placeholder-slate-600 outline-none transition-all focus:ring-1 focus:ring-indigo-500/20"
              />
              <Search className="absolute left-3.5 top-2.5 text-slate-500 w-4.5 h-4.5" />
            </div>

            {/* Filter by Competition */}
            <select
              id="admin-filter-comp"
              value={filterCompetition}
              onChange={(e) => setFilterCompetition(e.target.value)}
              className="px-3 py-2 bg-[#0a0f1d] border border-slate-800 text-white focus:border-indigo-500 rounded-xl text-sm font-semibold outline-none cursor-pointer"
            >
              <option value="all">All Competitions ({competitions.length})</option>
              {competitions.map((c) => (
                <option className="bg-[#0a0f1d]" key={c.id} value={c.id}>
                  {c.title} ({applicants.filter((a) => a.competitionId === c.id).length})
                </option>
              ))}
            </select>

            {/* Filter by Status */}
            <select
              id="admin-filter-status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-[#0a0f1d] border border-slate-800 text-white focus:border-indigo-500 rounded-xl text-sm font-semibold outline-none cursor-pointer"
            >
              <option value="all">All Statuses ({applicants.length})</option>
              <option value="Pending">Pending Evaluation</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="text-xs text-indigo-400 font-mono flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Showing {filteredApplicants.length} of {applicants.length} Applicants
          </div>
        </div>

        {/* Capacity Overview Warning banner if specific category has filled up */}
        <div className="flex flex-wrap gap-2 mb-6">
          {competitions.map((comp) => {
            const { selectedCount, maxAllowed, isFull } = getCompLimitsInfo(comp.id, comp.teamSize);
            if (selectedCount === 0) return null;
            return (
              <span
                key={comp.id}
                className={`text-[10px] font-mono px-2.5 py-1 rounded border flex items-center gap-1.5 ${
                  isFull
                    ? "bg-indigo-950/40 text-indigo-400 border-indigo-500/20 font-semibold"
                    : "bg-slate-900/60 text-slate-400 border-slate-800"
                }`}
              >
                <strong>{comp.title}:</strong> {selectedCount}/{maxAllowed} Selected
                {isFull && <Check className="w-3 h-3 text-indigo-400 inline" />}
              </span>
            );
          })}
        </div>

        {/* Applicants Grid/List */}
        {filteredApplicants.length > 0 ? (
          <div className="space-y-4">
            {filteredApplicants.map((app) => {
              const compObj = competitions.find((c) => c.id === app.competitionId);
              const { selectedCount, maxAllowed, isFull } = compObj
                ? getCompLimitsInfo(compObj.id, compObj.teamSize)
                : { selectedCount: 0, maxAllowed: 1, isFull: false };

              const isExpanded = expandedApplicantId === app.id;

              return (
                <div
                  key={app.id}
                  className={`bg-[#0c1222]/40 border rounded-xl overflow-hidden transition-all duration-150 ${
                    isExpanded ? "border-indigo-500/30 bg-[#0e162a]/80 shadow-sm" : "border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {/* Item Main Summary Header */}
                  <div
                    id={`app-header-${app.id}`}
                    onClick={() => setExpandedApplicantId(isExpanded ? null : app.id)}
                    className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-slate-300 font-mono text-xs">
                        {app.fullName.split(" ").map((n) => n[0]).join("").substring(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base font-sans font-bold text-white">
                            {app.fullName}
                          </h4>
                          <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-950/30 border border-indigo-500/20 px-1.5 py-0.5 rounded uppercase">
                            {app.grade} - {app.section}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Admission Code: <strong className="font-mono text-white">{app.admissionNumber}</strong>
                        </p>
                      </div>
                    </div>

                    {/* Middle Column: Applied Competition */}
                    <div className="md:text-left">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                        Target Competition
                      </span>
                      <span className="text-xs font-bold text-indigo-300">
                        {compObj?.title || "HALOCON Competition"}
                      </span>
                    </div>

                    {/* Right Column: Status & Expand Button */}
                    <div className="flex items-center justify-between md:justify-end gap-3">
                      <span
                        className={`text-2xs font-mono font-extrabold border px-2.5 py-1 rounded-full ${getStatusBadgeClass(
                          app.status
                        )}`}
                      >
                        {app.status.toUpperCase()}
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-indigo-500" /> : <ChevronDown className="w-4 h-4 text-indigo-500" />}
                    </div>
                  </div>

                  {/* Expanded Content Drawer */}
                  {isExpanded && (
                    <div className="border-t border-slate-800 p-4 md:p-5 bg-[#050a15]/80 space-y-4 animate-slideDown">
                      {/* Candidate profile card */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#0a0f1d] border border-slate-800/80 rounded-xl text-xs font-mono">
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                            Contact Email
                          </span>
                          <span className="font-medium text-white break-all">{app.email}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                            Contact Phone
                          </span>
                          <span className="font-medium text-white">{app.phone}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                            Candidate Skill Level
                          </span>
                          <span className="block font-bold text-indigo-400">{app.skillLevel}</span>
                        </div>
                      </div>

                      {/* Pitch/Motivation statement */}
                      <div className="space-y-1 font-mono">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                          Selection Pitch & Past Experience
                        </span>
                        <div className="p-4 bg-[#0a0f1d] border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed font-normal whitespace-pre-wrap">
                          {app.experiencePitch}
                        </div>
                      </div>

                      {/* Portfolio link */}
                      {app.portfolioUrl && (
                        <div className="flex items-center gap-2 font-mono">
                           <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                            Work Portfolio:
                          </span>
                          <a
                            href={app.portfolioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            View Candidate Showcase
                          </a>
                        </div>
                      )}

                      {/* Action controllers and Review feedback */}
                      <div className="border-t border-slate-800 pt-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        
                        {/* Interactive Status Updaters */}
                        <div className="space-y-2 w-full md:w-auto font-mono">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                            Representing Status Action:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {/* Shortlist button */}
                            <button
                              id={`shortlist-app-${app.id}`}
                              onClick={() => onUpdateStatus(app.id, "Shortlisted")}
                              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                                app.status === "Shortlisted"
                                  ? "bg-indigo-600 text-white border-indigo-500 shadow-sm"
                                  : "bg-slate-900 text-indigo-400 border-slate-800 hover:bg-indigo-950/40"
                              }`}
                            >
                              Shortlist
                            </button>

                            {/* Select button */}
                            <button
                              id={`select-app-${app.id}`}
                              onClick={() => {
                                if (app.status !== "Selected" && isFull) {
                                  if (
                                    !window.confirm(
                                      `SEATS EXCEEDED: ${compObj?.title} already has ${selectedCount}/${maxAllowed} selected. Are you sure you want to select another candidate to exceed standard representation caps?`
                                    )
                                  ) {
                                    return;
                                  }
                                }
                                onUpdateStatus(app.id, "Selected");
                              }}
                              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1 cursor-pointer ${
                                app.status === "Selected"
                                  ? "bg-emerald-600 text-white border-emerald-500 shadow-sm"
                                  : "bg-slate-900 text-emerald-400 border-slate-800 hover:bg-emerald-950/40"
                              }`}
                            >
                              <Check className="w-3.5 h-3.5" />
                              Select for Team
                            </button>

                            {/* Reject / Conclude review button */}
                            <button
                              id={`reject-app-${app.id}`}
                              onClick={() => onUpdateStatus(app.id, "Rejected")}
                              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                                app.status === "Rejected"
                                  ? "bg-slate-800 text-slate-200 border-slate-700 shadow-sm"
                                  : "bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800/40"
                              }`}
                            >
                              Conclude Review
                            </button>

                            {/* Reset button if needed */}
                            <button
                              id={`revert-app-${app.id}`}
                              onClick={() => onUpdateStatus(app.id, "Pending")}
                              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400 hover:bg-slate-800/40 hover:text-white transition-all cursor-pointer"
                            >
                              Reset to Pending
                            </button>
                          </div>
                        </div>

                        {/* Delete Candidate */}
                        <button
                          id={`delete-app-${app.id}`}
                          onClick={() => {
                            if (window.confirm(`Delete ${app.fullName}'s registration from the portal permanently?`)) {
                              onDeleteApplicant(app.id);
                            }
                          }}
                          className="text-xs font-semibold text-rose-400 hover:text-white bg-rose-950/20 border border-rose-950/30 rounded-lg px-2.5 py-1.5 self-end md:self-center flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete Application
                        </button>
                      </div>

                      {/* Coordinator Note Composer */}
                      <div className="border-t border-slate-800 pt-3 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between font-mono">
                        <div className="flex-1">
                          <div className="relative">
                            <input
                              id={`feedback-input-${app.id}`}
                              type="text"
                              placeholder="Write screening info (e.g. 'Report to Cs lab 1 tomorrow at 2:00 PM for quiz')"
                              value={feedbackText[app.id] ?? app.adminFeedback ?? ""}
                              onChange={(e) =>
                                setFeedbackText({ ...feedbackText, [app.id]: e.target.value })
                              }
                              className="w-full pl-9 pr-4 py-1.5 bg-[#0a0f1d]/70 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 outline-none focus:border-indigo-500 focus:bg-[#070b14] transition-all"
                            />
                            <MessageSquare className="absolute left-3 top-2.5 text-slate-500 w-3.5 h-3.5" />
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {savedFeedbackId === app.id && (
                            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              Saved!
                            </span>
                          )}
                          <button
                            id={`save-feedback-${app.id}`}
                            onClick={() => {
                              const text = feedbackText[app.id] ?? app.adminFeedback ?? "";
                              onUpdateFeedback(app.id, text.trim());
                              setSavedFeedbackId(app.id);
                              setTimeout(() => {
                                setSavedFeedbackId(null);
                              }, 2000);
                            }}
                            className="text-xs font-semibold text-indigo-400 bg-indigo-950/30 border border-indigo-500/20 rounded-lg px-4 py-1.5 hover:bg-indigo-950/50 transition-all flex-shrink-0 text-center cursor-pointer"
                          >
                            Save & Publish Note
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-950/40 border border-slate-800 rounded-xl">
            <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h4 className="text-base font-sans font-bold text-white">No Applications Matched</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed font-mono">
              No registered students match your filters or search keywords. Try adjusting your selections or view the full ledger.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
