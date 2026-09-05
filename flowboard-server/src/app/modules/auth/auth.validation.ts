import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

const googleLoginSchema = z.object({
  idToken: z.string(),
});

const sendOtpSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const verifyOtpSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().length(4, "OTP must be 4 characters long"),
});

const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters long"),
});

export const authValidation = {
  loginSchema,
  googleLoginSchema,
  sendOtpSchema,
  verifyOtpSchema,
  resetPasswordSchema,
};
