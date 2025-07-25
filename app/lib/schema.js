import { nullish, z } from "zod";

export const onboardingSchema = z.object({
  industry: z.string({
    required_error: "Industry is required",
  }),
  subIndustry: z.string({
    required_error: "Sub Industry is required",
  }),
  bio: z.string().max(500).optional(),
  experience: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number()
        .min(0, "Experience must be at least 0 years")
        .max(50, "Experience cannot exceed 50 years")
        .optional()
    ),
  skills: z.string().transform((val) =>
    val
      ? val
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      : []
  ),
});

// This code block defines a schema for a contact form using the zod library. It will validate form submissions to ensure that the submitted data is in the correct format.
// The contact form must have an email, mobile number, and optionally a linkedin and twitter field.
// The email must be a valid email address and the mobile must be a string.
// The linkedin and twitter fields are optional, meaning the form can be submitted without them.
export const contactSchema = z.object({
  email: z.string().email("Invalid email address"),
  mobile: z.string(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
});

export const entrySchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    organization: z.string().min(1, "Organization is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string(),
    description: z.string().min(1, "Description is required"),
    current: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (!data.current && !data.endDate) return false;
      return true;
    },
    {
      message: "End date is required unless it is your current position",
      path: ["endDate"],
    }
  );

export const resumeSchema = z.object({
  contactInfo: contactSchema,
  summary: z.string().min(1, "Professional Summary is required"),
  skills: z.string().min(1, "Skills is required"),
  experience: z.array(entrySchema),
  education: z.array(entrySchema),
  projects: z.array(entrySchema),
});
