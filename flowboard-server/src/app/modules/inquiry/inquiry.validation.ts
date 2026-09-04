import { z } from "zod";

const inquiryCreateValidationSchema = z.object({
  propertyId: z.string().optional(),
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name cannot exceed 50 characters"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name cannot exceed 50 characters"),
  email: z.string().trim().email("Invalid email address"),
  phoneNumber: z
    .string()
    .trim()
    .min(7, "Phone number is too short")
    .max(25, "Phone number is too long"),
  interest: z.enum([
    "BuyingResidence",
    "SellingProperty",
    "RentingOrLeasing",
    "CommercialAdvisory",
    "Other",
  ]).optional(),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(1000, "Message cannot exceed 1000 characters"),
});

export const inquiryValidation = {
  inquiryCreateValidationSchema,
};
