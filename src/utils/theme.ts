export interface NeonStyle {
  colorName: string;
  text: string;
  textLight: string;
  bgBadge: string;
  borderBadge: string;
  borderPanel: string;
  borderActive: string;
  borderHover: string;
  bgPanel: string;
  glow: string;
  glowStrong: string;
  glowHover: string;
  bullet: string;
  accentText: string;
  glowClass: string;
  btnBg: string;
  btnShadow: string;
  accentBg: string;
  accentBorder: string;
}

export const neonThemes: Record<string, NeonStyle> = {
  "Esports & Gaming": {
    colorName: "cyan",
    text: "text-cyan-400",
    textLight: "text-cyan-300",
    bgBadge: "bg-cyan-950/30",
    borderBadge: "border-cyan-500/20",
    borderPanel: "border-cyan-950/40",
    borderActive: "border-cyan-500/30",
    borderHover: "hover:border-cyan-500/20",
    bgPanel: "bg-[#0b1329]",
    glow: "shadow-sm",
    glowStrong: "shadow-md",
    glowHover: "hover:border-cyan-500/25",
    bullet: "text-cyan-400",
    accentText: "text-cyan-400",
    glowClass: "",
    btnBg: "bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/30 shadow-[0_0_12px_rgba(99,102,241,0.2)] hover:shadow-[0_0_18px_rgba(99,102,241,0.35)]",
    btnShadow: "shadow-sm",
    accentBg: "bg-cyan-950/20",
    accentBorder: "border-cyan-500/20",
  },
  "Competitive Programming": {
    colorName: "periwinkle",
    text: "text-indigo-400",
    textLight: "text-indigo-300",
    bgBadge: "bg-indigo-950/30",
    borderBadge: "border-indigo-500/20",
    borderPanel: "border-indigo-950/40",
    borderActive: "border-indigo-500/30",
    borderHover: "hover:border-indigo-500/20",
    bgPanel: "bg-[#0b1329]",
    glow: "shadow-sm",
    glowStrong: "shadow-md",
    glowHover: "hover:border-indigo-500/25",
    bullet: "text-indigo-400",
    accentText: "text-indigo-400",
    glowClass: "",
    btnBg: "bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/30 shadow-[0_0_12px_rgba(99,102,241,0.2)] hover:shadow-[0_0_18px_rgba(99,102,241,0.35)]",
    btnShadow: "shadow-sm",
    accentBg: "bg-indigo-950/20",
    accentBorder: "border-indigo-500/20",
  },
  "Trivia & Tech History": {
    colorName: "mint",
    text: "text-emerald-400",
    textLight: "text-emerald-300",
    bgBadge: "bg-emerald-950/30",
    borderBadge: "border-emerald-500/20",
    borderPanel: "border-emerald-950/40",
    borderActive: "border-emerald-500/30",
    borderHover: "hover:border-emerald-500/20",
    bgPanel: "bg-[#0b1329]",
    glow: "shadow-sm",
    glowStrong: "shadow-md",
    glowHover: "hover:border-emerald-500/25",
    bullet: "text-emerald-400",
    accentText: "text-emerald-400",
    glowClass: "",
    btnBg: "bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/30 shadow-[0_0_12px_rgba(99,102,241,0.2)] hover:shadow-[0_0_18px_rgba(99,102,241,0.35)]",
    btnShadow: "shadow-sm",
    accentBg: "bg-emerald-950/20",
    accentBorder: "border-emerald-500/20",
  },
  "Photography": {
    colorName: "slate",
    text: "text-slate-300",
    textLight: "text-slate-200",
    bgBadge: "bg-slate-800/30",
    borderBadge: "border-slate-500/15",
    borderPanel: "border-slate-850/80",
    borderActive: "border-slate-500/25",
    borderHover: "hover:border-slate-500/15",
    bgPanel: "bg-[#0b1329]",
    glow: "shadow-sm",
    glowStrong: "shadow-md",
    glowHover: "hover:border-slate-500/20",
    bullet: "text-slate-300",
    accentText: "text-slate-300",
    glowClass: "",
    btnBg: "bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/30 shadow-[0_0_12px_rgba(99,102,241,0.2)] hover:shadow-[0_0_18px_rgba(99,102,241,0.35)]",
    btnShadow: "shadow-sm",
    accentBg: "bg-slate-800/20",
    accentBorder: "border-slate-500/15",
  },
  "UI/UX & Graphic Design": {
    colorName: "cyan-blue",
    text: "text-cyan-400",
    textLight: "text-cyan-300",
    bgBadge: "bg-cyan-950/30",
    borderBadge: "border-cyan-500/20",
    borderPanel: "border-cyan-950/40",
    borderActive: "border-cyan-500/30",
    borderHover: "hover:border-cyan-500/20",
    bgPanel: "bg-[#0b1329]",
    glow: "shadow-sm",
    glowStrong: "shadow-md",
    glowHover: "hover:border-cyan-500/25",
    bullet: "text-cyan-400",
    accentText: "text-cyan-400",
    glowClass: "",
    btnBg: "bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/30 shadow-[0_0_12px_rgba(99,102,241,0.2)] hover:shadow-[0_0_18px_rgba(99,102,241,0.35)]",
    btnShadow: "shadow-sm",
    accentBg: "bg-cyan-950/20",
    accentBorder: "border-cyan-500/20",
  },
  "Artificial Intelligence": {
    colorName: "mint-tech",
    text: "text-emerald-400",
    textLight: "text-emerald-300",
    bgBadge: "bg-emerald-950/30",
    borderBadge: "border-emerald-500/20",
    borderPanel: "border-emerald-950/40",
    borderActive: "border-emerald-500/30",
    borderHover: "hover:border-emerald-500/20",
    bgPanel: "bg-[#0b1329]",
    glow: "shadow-sm",
    glowStrong: "shadow-md",
    glowHover: "hover:border-emerald-500/25",
    bullet: "text-emerald-400",
    accentText: "text-emerald-400",
    glowClass: "",
    btnBg: "bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/30 shadow-[0_0_12px_rgba(99,102,241,0.2)] hover:shadow-[0_0_18px_rgba(99,102,241,0.35)]",
    btnShadow: "shadow-sm",
    accentBg: "bg-emerald-950/20",
    accentBorder: "border-emerald-500/20",
  },
  "Filmmaking & Editing": {
    colorName: "periwinkle-tech",
    text: "text-indigo-400",
    textLight: "text-indigo-300",
    bgBadge: "bg-indigo-950/30",
    borderBadge: "border-indigo-500/20",
    borderPanel: "border-indigo-950/40",
    borderActive: "border-indigo-500/30",
    borderHover: "hover:border-indigo-500/20",
    bgPanel: "bg-[#0b1329]",
    glow: "shadow-sm",
    glowStrong: "shadow-md",
    glowHover: "hover:border-indigo-500/25",
    bullet: "text-indigo-400",
    accentText: "text-indigo-400",
    glowClass: "",
    btnBg: "bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/30 shadow-[0_0_12px_rgba(99,102,241,0.2)] hover:shadow-[0_0_18px_rgba(99,102,241,0.35)]",
    btnShadow: "shadow-sm",
    accentBg: "bg-indigo-950/20",
    accentBorder: "border-indigo-500/20",
  },
};

export function getNeonStyle(category: string): NeonStyle {
  return neonThemes[category] || neonThemes["Competitive Programming"];
}
