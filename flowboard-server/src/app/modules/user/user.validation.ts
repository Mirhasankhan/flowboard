import { z } from "zod";

const createPendingUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(2, "Full name must be at least 2 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const verifyEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z
    .string()
    .min(4, "OTP must be at least 4 characters long")
    .max(4, "OTP must be at most 4 characters long"),
});

export const userValidation = {
  createPendingUserSchema,
  verifyEmailSchema,
};
