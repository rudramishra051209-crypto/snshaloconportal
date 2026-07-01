import React, { useState, useEffect } from "react";
import { Competition, Applicant } from "../types";
import { Sparkles, ArrowLeft, Send, CheckCircle2, AlertCircle, Award, Link2 } from "lucide-react";
import { getNeonStyle } from "../utils/theme";

interface RegistrationFormProps {
  competitions: Competition[];
  selectedCompetitionId: string | null;
  onClose: () => void;
  onSubmit: (applicantData: Omit<Applicant, "id" | "status" | "submittedAt">) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  competitions,
  selectedCompetitionId,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    grade: "Grade 9",
    section: "A",
    admissionNumber: "",
    phone: "",
    competitionId: selectedCompetitionId || (competitions[0]?.id ?? ""),
    skillLevel: "Intermediate" as "Beginner" | "Intermediate" | "Advanced",
    portfolioUrl: "",
    experiencePitch: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdAdmissionNum, setCreatedAdmissionNum] = useState("");

  // Sync selected competition from parent clicks
  useEffect(() => {
    if (selectedCompetitionId) {
      setFormData((prev) => ({ ...prev, competitionId: selectedCompetitionId }));
    }
  }, [selectedCompetitionId]);

  const selectedCompObj = competitions.find((c) => c.id === formData.competitionId);
  const neon = getNeonStyle(selectedCompObj?.category ?? "Competitive Programming");

  const getFocusBorderClass = (colorName: string) => {
    switch (colorName) {
      case "cyan": return "focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20";
      case "purple": return "focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/20";
      case "emerald": return "focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20";
      case "rose": return "focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20";
      case "violet": return "focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20";
      case "amber": return "focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20";
      case "teal": return "focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20";
      case "pink": return "focus:border-pink-500 focus:ring-1 focus:ring-pink-500/20";
      default: return "focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20";
    }
  };

  const focusClass = getFocusBorderClass(neon.colorName);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) tempErrors.fullName = "Full Name is required.";
    
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!formData.admissionNumber.trim()) {
      tempErrors.admissionNumber = "Admission Number is required.";
    } else if (!/^SNS\/\d{4}\/\d{3,5}$/i.test(formData.admissionNumber.trim())) {
      tempErrors.admissionNumber = "Must match format SNS/YYYY/NUMBER (e.g., SNS/2024/1045).";
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required.";
    } else if (!/^\+?[\d\s-]{10,14}$/.test(formData.phone)) {
      tempErrors.phone = "Enter a valid 10-12 digit contact number.";
    }

    if (!formData.section.trim()) {
      tempErrors.section = "Section is required.";
    }

    if (!formData.experiencePitch.trim()) {
      tempErrors.experiencePitch = "Please pitch your skills and past experiences.";
    } else if (formData.experiencePitch.trim().length < 50) {
      tempErrors.experiencePitch = "Your pitch must be at least 50 characters to be considered.";
    }

    if (formData.portfolioUrl && !/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(formData.portfolioUrl)) {
      tempErrors.portfolioUrl = "Please provide a valid HTTP/HTTPS link (e.g., https://github.com/user).";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        grade: formData.grade,
        section: formData.section.trim().toUpperCase(),
        admissionNumber: formData.admissionNumber.trim().toUpperCase(),
        phone: formData.phone.trim(),
        competitionId: formData.competitionId,
        skillLevel: formData.skillLevel,
        portfolioUrl: formData.portfolioUrl.trim() || undefined,
        experiencePitch: formData.experiencePitch.trim(),
      });
      setCreatedAdmissionNum(formData.admissionNumber.toUpperCase());
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`bg-slate-950/90 backdrop-blur-md border ${neon.borderBadge} rounded-2xl p-6 md:p-10 max-w-2xl mx-auto text-center shadow-2xl animate-fadeIn select-none`}>
        <div className={`w-16 h-16 ${neon.bgBadge} border ${neon.borderBadge} ${neon.text} rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl`}>
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-white mb-3">
          Application Submitted!
        </h2>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-md mx-auto mb-6">
          Thank you, <strong className={`${neon.text} font-mono`}>{formData.fullName}</strong>. Your registration for{" "}
          <strong className={`${neon.textLight} font-mono`}>{selectedCompObj?.title || "the competition"}</strong> has been received by St. Norbert School Tech coordinators.
        </p>

        <div className={`bg-slate-950/60 border ${neon.borderPanel} rounded-xl p-4 mb-8 text-left max-w-md mx-auto shadow-inner`}>
          <h4 className={`text-xs font-mono font-bold ${neon.text} uppercase tracking-widest mb-2.5`}>
            // Your Status Tracking Info:
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <span className="text-slate-400">Admission No:</span>
            <span className={`font-mono font-bold ${neon.text} text-right`}>{createdAdmissionNum}</span>
            <span className="text-slate-400">Registered Event:</span>
            <span className="font-bold text-white text-right">{selectedCompObj?.title}</span>
            <span className="text-slate-400">Initial Status:</span>
            <span className="text-yellow-400 font-mono font-bold text-right bg-yellow-950/40 border border-yellow-500/20 px-2 py-0.5 rounded w-max ml-auto">
              PENDING REVIEW
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            id="status-check-nav-btn"
            onClick={onClose}
            className={`bg-slate-900 hover:bg-slate-800 border ${neon.borderBadge} ${neon.text} font-bold text-sm py-2.5 px-6 rounded-xl transition-all duration-200 cursor-pointer`}
          >
            Go Back to Competitions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`developer-glass rounded-2xl p-6 md:p-8 max-w-3xl mx-auto shadow-2xl border transition-all duration-300 ${neon.borderPanel} ${neon.glow}`}>
      {/* Header and Back Button */}
      <div className={`flex items-center justify-between gap-4 mb-6 pb-4 border-b ${neon.borderPanel}`}>
        <button
          id="back-to-comps-btn"
          onClick={onClose}
          className={`flex items-center gap-1.5 text-xs font-mono font-bold text-slate-400 hover:${neon.text} transition-colors cursor-pointer`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Competitions
        </button>
        <span className={`font-mono text-[10px] font-bold ${neon.text} ${neon.bgBadge} border ${neon.borderBadge} px-2 py-0.5 rounded`}>
          SNS-HALOCON-2026
        </span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 ${neon.bgBadge} border ${neon.borderBadge} ${neon.text} rounded-lg shadow-inner`}>
          <Award className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-sans font-extrabold text-white tracking-tight">
            Apply for SNS Team Selection
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            Fill in details to pitch yourself for representation in the school team.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Name and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block font-mono">
              Full Name *
            </label>
            <input
              id="input-fullName"
              type="text"
              required
              placeholder="e.g., Rudra Mishra"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={`w-full px-4 py-2.5 bg-slate-950/50 border rounded-xl text-sm font-medium text-white placeholder-slate-600 transition-all ${
                errors.fullName ? "border-rose-500 bg-rose-950/20" : `border-slate-800 ${focusClass}`
              } outline-none`}
            />
            {errors.fullName && (
              <span className="text-xs text-rose-400 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.fullName}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block font-mono">
              Email Address *
            </label>
            <input
              id="input-email"
              type="email"
              required
              placeholder="e.g., student@stnorbertschool.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-2.5 bg-slate-950/50 border rounded-xl text-sm font-medium text-white placeholder-slate-600 transition-all ${
                errors.email ? "border-rose-500 bg-rose-950/20" : `border-slate-800 ${focusClass}`
              } outline-none`}
            />
            {errors.email && (
              <span className="text-xs text-rose-400 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.email}
              </span>
            )}
          </div>
        </div>

        {/* Row 2: Admission Number & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block font-mono">
              SNS Admission Number *
            </label>
            <input
              id="input-admissionNumber"
              type="text"
              required
              placeholder="SNS/YYYY/NUMBER (e.g. SNS/2202/145)"
              value={formData.admissionNumber}
              onChange={(e) => setFormData({ ...formData, admissionNumber: e.target.value })}
              className={`w-full px-4 py-2.5 bg-slate-950/50 border rounded-xl text-sm font-mono font-medium text-white placeholder-slate-600 transition-all ${
                errors.admissionNumber ? "border-rose-500 bg-rose-950/20" : `border-slate-800 ${focusClass}`
              } outline-none`}
            />
            {errors.admissionNumber ? (
              <span className="text-[11px] text-rose-400 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.admissionNumber}
              </span>
            ) : (
              <span className="text-[10px] text-slate-400 block font-mono">
                Use your official St. Norbert admission registration code.
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block font-mono">
              Contact Number *
            </label>
            <input
              id="input-phone"
              type="tel"
              required
              placeholder="e.g., 9876543210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full px-4 py-2.5 bg-slate-950/50 border rounded-xl text-sm font-medium text-white placeholder-slate-600 transition-all ${
                errors.phone ? "border-rose-500 bg-rose-950/20" : `border-slate-800 ${focusClass}`
              } outline-none`}
            />
            {errors.phone && (
              <span className="text-xs text-rose-400 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.phone}
              </span>
            )}
          </div>
        </div>

        {/* Row 3: Grade, Section & Skill Level */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block font-mono">
              Grade / Class *
            </label>
            <select
              id="select-grade"
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              className={`w-full px-4 py-2.5 bg-slate-950 border border-slate-800 text-white ${focusClass} rounded-xl text-sm font-medium outline-none`}
            >
              <option className="bg-slate-950 text-white" value="Grade 6">Grade 6</option>
              <option className="bg-slate-950 text-white" value="Grade 7">Grade 7</option>
              <option className="bg-slate-950 text-white" value="Grade 8">Grade 8</option>
              <option className="bg-slate-950 text-white" value="Grade 9">Grade 9</option>
              <option className="bg-slate-950 text-white" value="Grade 10">Grade 10</option>
              <option className="bg-slate-950 text-white" value="Grade 11">Grade 11</option>
              <option className="bg-slate-950 text-white" value="Grade 12">Grade 12</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block font-mono">
              Section *
            </label>
            <input
              id="input-section"
              type="text"
              required
              placeholder="e.g., A, B, C, D"
              maxLength={4}
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              className={`w-full px-4 py-2.5 bg-slate-950/50 border rounded-xl text-sm font-medium text-white placeholder-slate-600 transition-all ${
                errors.section ? "border-rose-500 bg-rose-950/20" : `border-slate-800 ${focusClass}`
              } outline-none`}
            />
            {errors.section && (
              <span className="text-xs text-rose-400 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.section}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block font-mono">
              My Skill Rating *
            </label>
            <select
              id="select-skillLevel"
              value={formData.skillLevel}
              onChange={(e) => setFormData({ ...formData, skillLevel: e.target.value as any })}
              className={`w-full px-4 py-2.5 bg-slate-950 border border-slate-800 text-white ${focusClass} rounded-xl text-sm font-medium outline-none`}
            >
              <option className="bg-slate-950 text-white" value="Beginner">Beginner / Aspiring</option>
              <option className="bg-slate-950 text-white" value="Intermediate">Intermediate Practitioner</option>
              <option className="bg-slate-950 text-white" value="Advanced">Advanced Pro / Specialist</option>
            </select>
          </div>
        </div>

        {/* Row 4: Competition Selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block font-mono">
            Target HALOCON Competition *
          </label>
          <select
            id="select-competitionId"
            value={formData.competitionId}
            onChange={(e) => setFormData({ ...formData, competitionId: e.target.value })}
            className={`w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white ${focusClass} rounded-xl text-sm font-bold ${neon.text} outline-none`}
          >
            {competitions.map((comp) => (
              <option className="bg-slate-950 text-white font-mono" key={comp.id} value={comp.id}>
                {comp.title} — ({comp.category} • Team: {comp.teamSize})
              </option>
            ))}
          </select>
          {selectedCompObj && (
            <div className={`p-3 bg-slate-950/50 border ${neon.borderPanel} rounded-lg text-xs text-slate-300 mt-2`}>
              <strong className="text-white font-bold block mb-1 font-mono">// Eligibility Check:</strong>
              This event is open to {selectedCompObj.eligibility}. Your selected school selection format is: <em className={`${neon.text} font-bold font-mono ${neon.bgBadge} border ${neon.borderBadge} px-1.5 py-0.5 rounded`}>{selectedCompObj.selectionMethod}</em>.
            </div>
          )}
        </div>

        {/* Row 5: Portfolio URL */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block font-mono flex items-center gap-1.5">
            <Link2 className={`w-3.5 h-3.5 ${neon.text}`} />
            Portfolio URL / Work Showcase Link (Optional)
          </label>
          <input
            id="input-portfolioUrl"
            type="url"
            placeholder="e.g. https://github.com/myusername or Google Drive folder"
            value={formData.portfolioUrl}
            onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
            className={`w-full px-4 py-2.5 bg-slate-950/50 border rounded-xl text-sm font-medium text-white placeholder-slate-600 transition-all ${
              errors.portfolioUrl ? "border-rose-500 bg-rose-950/20" : `border-slate-800 ${focusClass}`
            } outline-none`}
          />
          {errors.portfolioUrl ? (
            <span className="text-xs text-rose-400 font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.portfolioUrl}
            </span>
          ) : (
            <span className="text-[10px] text-slate-400 block font-mono">
              Provide links to past design profiles, GitHub repos, or shared files to support your candidacy.
            </span>
          )}
        </div>

        {/* Row 6: Experience & Pitch */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block font-mono">
            Past Accomplishments & Why We Should Select You * (Min 50 chars)
          </label>
          <textarea
            id="textarea-experiencePitch"
            required
            rows={5}
            placeholder="Describe your expertise, past projects, any hackathons, programming contests, cryptic hunts, or creative film-editing events you have participated in or won. Explain how you'll prepare and why you are the best fit to represent St. Norbert School!"
            value={formData.experiencePitch}
            onChange={(e) => setFormData({ ...formData, experiencePitch: e.target.value })}
            className={`w-full px-4 py-3 bg-slate-950/50 border rounded-xl text-sm font-medium leading-relaxed text-white placeholder-slate-600 transition-all ${
              errors.experiencePitch ? "border-rose-500 bg-rose-950/20" : `border-slate-800 ${focusClass}`
            } outline-none`}
          />
          <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
            <span>Minimum 50 characters required for evaluation.</span>
            <span className={formData.experiencePitch.trim().length >= 50 ? `${neon.text} font-bold` : "text-yellow-600 font-semibold"}>
              {formData.experiencePitch.trim().length} characters
            </span>
          </div>
          {errors.experiencePitch && (
            <span className="text-xs text-rose-400 font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.experiencePitch}
            </span>
          )}
        </div>

        {/* Action Tray */}
        <div className={`pt-4 border-t ${neon.borderPanel} flex flex-col sm:flex-row gap-3`}>
          <button
            id="submit-reg-btn"
            type="submit"
            className={`flex-1 ${neon.btnBg} text-white font-sans font-semibold text-base py-3 px-6 rounded-xl ${neon.btnShadow} transition-all duration-150 flex items-center justify-center gap-2 border ${neon.borderBadge} cursor-pointer`}
          >
            <Send className="w-4 h-4" />
            Submit Selection Pitch
          </button>
          
          <button
            id="cancel-reg-btn"
            type="button"
            onClick={onClose}
            className={`sm:w-36 border border-slate-800 bg-slate-900/40 hover:bg-slate-800/40 text-slate-300 hover:text-white font-semibold text-sm py-3 rounded-xl transition-all cursor-pointer`}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
