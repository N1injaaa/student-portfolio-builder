import { z } from "zod";

export const overviewSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  headline: z.string().max(120, "Keep it under 120 characters").optional().or(z.literal("")),
  photoUrl: z.string().optional().or(z.literal("")),
  bio: z.string().max(600, "Keep it under 600 characters").optional().or(z.literal("")),
  location: z.string().optional().or(z.literal("")),
  email: z.string().email("Enter a valid email").or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  website: z.string().optional().or(z.literal("")),
  linkedin: z.string().optional().or(z.literal("")),
  github: z.string().optional().or(z.literal("")),
});

export const educationSchema = z.object({
  school: z.string().min(1, "School name is required"),
  degree: z.string().min(1, "Degree or grade is required"),
  startDate: z.string().optional().or(z.literal("")),
  endDate: z.string().optional().or(z.literal("")),
  gpa: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
});

export const achievementSchema = z.object({
  title: z.string().min(1, "Title is required"),
  organization: z.string().optional().or(z.literal("")),
  date: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
});

export const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional().or(z.literal("")),
  technologies: z.string().optional().or(z.literal("")),
  githubUrl: z.string().optional().or(z.literal("")),
  liveUrl: z.string().optional().or(z.literal("")),
  imageUrl: z.string().optional().or(z.literal("")),
});

export const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  category: z.string().optional().or(z.literal("")),
  level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]),
});

export const languageSchema = z.object({
  language: z.string().min(1, "Language is required"),
  level: z.enum(["Native", "Fluent", "Advanced", "Intermediate", "Basic"]),
});

export const certificateSchema = z.object({
  name: z.string().min(1, "Certificate name is required"),
  organization: z.string().optional().or(z.literal("")),
  date: z.string().optional().or(z.literal("")),
  credentialUrl: z.string().optional().or(z.literal("")),
});

export const activitySchema = z.object({
  organization: z.string().min(1, "Organization is required"),
  position: z.string().optional().or(z.literal("")),
  startDate: z.string().optional().or(z.literal("")),
  endDate: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
});
