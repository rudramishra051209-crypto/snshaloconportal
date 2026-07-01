export interface Competition {
  id: string;
  title: string;
  category: string;
  iconName: string;
  description: string;
  rules: string[];
  teamSize: string;
  eligibility: string;
  selectionMethod: string;
  coordinators: string[];
  pastelBg: string; // Tailwind background style (e.g., bg-purple-50/60)
  pastelBorder: string; // Tailwind border style (e.g., border-purple-300/60)
  pastelAccent: string; // Tailwind accent border/text (e.g., text-purple-600 bg-purple-100)
  glowColor: string; // Tailwind drop-shadow style
}

export interface Applicant {
  id: string;
  fullName: string;
  email: string;
  grade: string;
  section: string;
  admissionNumber: string;
  phone: string;
  competitionId: string;
  skillLevel: "Beginner" | "Intermediate" | "Advanced";
  portfolioUrl?: string;
  experiencePitch: string;
  status: "Pending" | "Shortlisted" | "Selected" | "Rejected";
  submittedAt: string;
  adminFeedback?: string;
}

export interface Stats {
  totalRegistered: number;
  totalSelected: number;
  totalShortlisted: number;
  totalPending: number;
}
