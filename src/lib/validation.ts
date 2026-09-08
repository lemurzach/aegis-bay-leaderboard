import { z } from "zod";

export const heroSchema = z.object({
  rank: z.coerce.number().int().min(1, "Rank must be 1 or higher"),
  name: z.string().trim().min(1, "Real name is required"),
  heroName: z.string().trim().min(1, "Hero name is required"),
  quirk: z.string().trim().min(1, "Quirk name is required"),
  quirkDescription: z.string().trim().min(1, "Quirk description is required"),
  bio: z.string().trim().min(1, "Bio is required"),
  imageUrl: z
    .union([z.url("Must be a valid URL"), z.literal("")])
    .optional()
    .transform((v) => (v ? v : undefined)),
  agency: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? v : undefined)),
  status: z.enum(["ACTIVE", "RETIRED", "MISSING"]),
});

export type HeroInput = z.infer<typeof heroSchema>;

export const villainSchema = z.object({
  name: z.string().trim().min(1, "Real name is required"),
  alias: z.string().trim().min(1, "Alias is required"),
  quirk: z.string().trim().min(1, "Quirk name is required"),
  quirkDescription: z.string().trim().min(1, "Quirk description is required"),
  bio: z.string().trim().min(1, "Bio is required"),
  imageUrl: z
    .union([z.url("Must be a valid URL"), z.literal("")])
    .optional()
    .transform((v) => (v ? v : undefined)),
  organization: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? v : undefined)),
  bounty: z.coerce.number().int().min(0, "Bounty can't be negative"),
  dangerLevel: z.enum(["LOW", "MODERATE", "HIGH", "EXTREME"]),
  status: z.enum(["AT_LARGE", "CAPTURED"]),
  lastKnownLocation: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? v : undefined)),
});

export type VillainInput = z.infer<typeof villainSchema>;

export const npcSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  role: z.string().trim().min(1, "Role is required"),
  quirk: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? v : undefined)),
  quirkDescription: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? v : undefined)),
  bio: z.string().trim().min(1, "Bio is required"),
  imageUrl: z
    .union([z.url("Must be a valid URL"), z.literal("")])
    .optional()
    .transform((v) => (v ? v : undefined)),
  location: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? v : undefined)),
});

export type NpcInput = z.infer<typeof npcSchema>;

export const signupSchema = z.object({
  email: z.email("Enter a valid email address").trim().toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.email("Enter a valid email address").trim().toLowerCase(),
  password: z.string().min(1, "Enter your password"),
});

export const noteSchema = z.object({
  content: z.string().trim().min(1, "Note can't be empty").max(4000, "Note is too long"),
});
