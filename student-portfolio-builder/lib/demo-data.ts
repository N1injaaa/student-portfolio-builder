import { newId } from "@/lib/utils";
import {
  defaultPortfolioSettings,
  defaultResumeSettings,
  type Profile,
} from "@/types/profile";

export function buildDemoProfile(): Profile {
  return {
    overview: {
      fullName: "Alex Johnson",
      headline: "Computer Science Student",
      photoUrl: "",
      bio: "Building technology that solves real problems. Third-year CS student focused on applied machine learning, with a habit of shipping side projects that started as weekend experiments.",
      location: "Austin, Texas, USA",
      email: "alex.johnson@example.com",
      phone: "+1 (512) 555-0142",
      website: "alexjohnson.dev",
      linkedin: "linkedin.com/in/alexjohnson",
      github: "github.com/alexjohnson",
    },
    education: [
      {
        id: newId(),
        school: "University of Texas at Austin",
        degree: "B.S. in Computer Science",
        startDate: "2022",
        endDate: "2026",
        gpa: "3.85 / 4.0",
        description:
          "Focus in artificial intelligence and human-computer interaction. Member of the Dean's List for five consecutive semesters.",
      },
      {
        id: newId(),
        school: "Westlake High School",
        degree: "High School Diploma",
        startDate: "2018",
        endDate: "2022",
        gpa: "4.2 / 4.0 (weighted)",
        description:
          "Graduated valedictorian. Captain of the robotics team and editor of the school's science journal.",
      },
    ],
    achievements: [
      {
        id: newId(),
        title: "1st Place, HackTX Hackathon",
        organization: "HackTX",
        date: "Nov 2025",
        description:
          "Led a team of four to build an accessibility-focused study tool in 36 hours, judged best overall project among 120 teams.",
      },
      {
        id: newId(),
        title: "Dean's List",
        organization: "University of Texas at Austin",
        date: "2023 – 2025",
        description: "Recognized for academic excellence for five consecutive semesters.",
      },
      {
        id: newId(),
        title: "National Merit Scholar",
        organization: "National Merit Scholarship Corporation",
        date: "2022",
        description: "Awarded for top 1% PSAT/NMSQT performance nationwide.",
      },
    ],
    projects: [
      {
        id: newId(),
        name: "AI Study Planner",
        description:
          "A web app that turns a syllabus into an adaptive study schedule, using spaced repetition and workload estimation to rebalance plans as deadlines shift.",
        technologies: "Next.js, TypeScript, Python, FastAPI, PostgreSQL",
        githubUrl: "https://github.com/alexjohnson/ai-study-planner",
        liveUrl: "https://study-planner.alexjohnson.dev",
        imageUrl: "",
      },
      {
        id: newId(),
        name: "Personal Finance Dashboard",
        description:
          "Self-hosted budgeting dashboard with bank-statement import, category rules, and forecast charts. Built to replace three spreadsheets.",
        technologies: "React, D3.js, Node.js, SQLite",
        githubUrl: "https://github.com/alexjohnson/finance-dashboard",
        liveUrl: "",
        imageUrl: "",
      },
      {
        id: newId(),
        name: "E-commerce Platform",
        description:
          "A course project turned real store for a campus student group, handling inventory, checkout, and order tracking end to end.",
        technologies: "Next.js, Stripe, Prisma, Tailwind CSS",
        githubUrl: "https://github.com/alexjohnson/campus-store",
        liveUrl: "https://campus-store.alexjohnson.dev",
        imageUrl: "",
      },
    ],
    skills: [
      { id: newId(), name: "Python", category: "Languages", level: "Advanced" },
      { id: newId(), name: "TypeScript", category: "Languages", level: "Advanced" },
      { id: newId(), name: "React / Next.js", category: "Frameworks", level: "Advanced" },
      { id: newId(), name: "SQL", category: "Data", level: "Intermediate" },
      { id: newId(), name: "Machine Learning", category: "Data", level: "Intermediate" },
      { id: newId(), name: "Figma", category: "Design", level: "Intermediate" },
    ],
    languages: [
      { id: newId(), language: "English", level: "Native" },
      { id: newId(), language: "Spanish", level: "Fluent" },
      { id: newId(), language: "Mandarin", level: "Basic" },
    ],
    certificates: [
      {
        id: newId(),
        name: "Machine Learning Specialization",
        organization: "DeepLearning.AI",
        date: "Aug 2025",
        credentialUrl: "https://coursera.org/verify/example",
      },
      {
        id: newId(),
        name: "AWS Certified Cloud Practitioner",
        organization: "Amazon Web Services",
        date: "Mar 2025",
        credentialUrl: "https://aws.amazon.com/verification",
      },
    ],
    activities: [
      {
        id: newId(),
        organization: "UT Austin Computer Science Society",
        position: "Vice President",
        startDate: "2024",
        endDate: "Present",
        description:
          "Organize weekly workshops and a peer-mentoring program for first-year CS majors.",
      },
      {
        id: newId(),
        organization: "Code for Austin",
        position: "Volunteer Developer",
        startDate: "2023",
        endDate: "Present",
        description:
          "Contribute to civic-tech projects that help local nonprofits manage volunteers and donations.",
      },
    ],
    resumeSettings: { ...defaultResumeSettings },
    portfolioSettings: {
      ...defaultPortfolioSettings,
      username: "alex",
    },
  };
}
