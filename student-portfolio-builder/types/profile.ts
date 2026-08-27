export interface Overview {
  fullName: string;
  headline: string;
  photoUrl: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  github: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string; // comma separated
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
}

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: SkillLevel;
}

export type LanguageLevel =
  | "Native"
  | "Fluent"
  | "Advanced"
  | "Intermediate"
  | "Basic";

export interface Language {
  id: string;
  language: string;
  level: LanguageLevel;
}

export interface Certificate {
  id: string;
  name: string;
  organization: string;
  date: string;
  credentialUrl: string;
}

export interface Activity {
  id: string;
  organization: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export type ResumeTemplateId = "minimal" | "modern" | "academic" | "professional";

export interface ResumeSettings {
  templateId: ResumeTemplateId;
  font: "sans" | "serif" | "mono";
  fontSize: "sm" | "md" | "lg";
  spacing: "compact" | "comfortable" | "roomy";
  accentColor: string; // hex
  visibleSections: {
    education: boolean;
    projects: boolean;
    achievements: boolean;
    skills: boolean;
    languages: boolean;
    certificates: boolean;
    activities: boolean;
  };
}

export type PortfolioTheme =
  | "paper"
  | "ink"
  | "orchard"
  | "slate"
  | "meadow"
  | "sandstone"
  | "midnight"
  | "blossom";
export type PortfolioLayout = "classic" | "split" | "timeline";
export type PhotoStyle = "circle" | "square" | "rounded";

export interface PortfolioSettings {
  username: string;
  theme: PortfolioTheme;
  accentColor: string;
  layout: PortfolioLayout;
  photoStyle: PhotoStyle;
  visibleSections: {
    about: boolean;
    education: boolean;
    projects: boolean;
    achievements: boolean;
    skills: boolean;
    certificates: boolean;
    contact: boolean;
  };
  isPublished: boolean;
}

export interface Profile {
  overview: Overview;
  education: Education[];
  achievements: Achievement[];
  projects: Project[];
  skills: Skill[];
  languages: Language[];
  certificates: Certificate[];
  activities: Activity[];
  resumeSettings: ResumeSettings;
  portfolioSettings: PortfolioSettings;
}

export const emptyOverview: Overview = {
  fullName: "",
  headline: "",
  photoUrl: "",
  bio: "",
  location: "",
  email: "",
  phone: "",
  website: "",
  linkedin: "",
  github: "",
};

export const defaultResumeSettings: ResumeSettings = {
  templateId: "minimal",
  font: "sans",
  fontSize: "md",
  spacing: "comfortable",
  accentColor: "#a57c1b",
  visibleSections: {
    education: true,
    projects: true,
    achievements: true,
    skills: true,
    languages: true,
    certificates: true,
    activities: true,
  },
};

export const defaultPortfolioSettings: PortfolioSettings = {
  username: "",
  theme: "paper",
  accentColor: "#a57c1b",
  layout: "classic",
  photoStyle: "rounded",
  visibleSections: {
    about: true,
    education: true,
    projects: true,
    achievements: true,
    skills: true,
    certificates: true,
    contact: true,
  },
  isPublished: true,
};

export const emptyProfile: Profile = {
  overview: emptyOverview,
  education: [],
  achievements: [],
  projects: [],
  skills: [],
  languages: [],
  certificates: [],
  activities: [],
  resumeSettings: defaultResumeSettings,
  portfolioSettings: defaultPortfolioSettings,
};
