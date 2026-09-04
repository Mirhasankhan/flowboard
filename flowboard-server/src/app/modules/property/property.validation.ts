import { z } from "zod";

const propertyCreateValidationSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be at most 100 characters long"),
  location: z
    .string()
    .trim()
    .min(2, "Location must be at least 2 characters long")
    .max(100, "Location must be at most 100 characters long"),
  city: z
    .string()
    .trim()
    .min(2, "City must be at least 2 characters long")
    .max(50, "City must be at most 50 characters long"),
  latitude: z
    .number({
      required_error: "Latitude is required",
      invalid_type_error: "Latitude must be a valid number",
    })
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  longitude: z
    .number({
      required_error: "Longitude is required",
      invalid_type_error: "Longitude must be a valid number",
    })
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be greater than 0"),
  propertyType: z.enum(
    ["Apartment", "Villa", "Penthouse", "TownHouse", "Office"],
    {
      required_error: "Property type is required",
    },
  ),
  status: z.enum(["Rent", "Sale"], {
    required_error: "Status is required",
  }),
  bedrooms: z
    .number({
      required_error: "Bedrooms is required",
      invalid_type_error: "Bedrooms must be a number",
    })
    .int("Bedrooms must be an integer")
    .min(0, "Bedrooms cannot be negative"),
  bathrooms: z
    .number({
      required_error: "Bathrooms is required",
      invalid_type_error: "Bathrooms must be a number",
    })
    .int("Bathrooms must be an integer")
    .min(0, "Bathrooms cannot be negative"),
  area: z
    .number({
      required_error: "Area is required",
      invalid_type_error: "Area must be a number",
    })
    .positive("Area must be greater than 0")
    .max(100000, "Area must be less than or equal to 1,000,00"),
  amenities: z
    .array(z.string().trim().min(1))
    .min(1, "At least one amenity is required")
    .max(20, "Amenities cannot exceed 20 items"),
  description: z.string().trim().min(1, "Description is required"),
});

const propertyUpdateValidationSchema = z.object({
  propertyId: z.string().trim().min(1, "Property ID is required"),
  title: z.string().trim().min(1).optional(),
  location: z.string().trim().min(1).optional(),
  city: z.string().trim().min(1).optional(),
  latitude: z
    .number({
      invalid_type_error: "Latitude must be a number",
    })
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90")
    .optional(),
  longitude: z
    .number({
      invalid_type_error: "Longitude must be a number",
    })
    .optional(),
  price: z
    .number({
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be greater than 0")
    .optional(),
  propertyType: z
    .enum(["Apartment", "Villa", "Penthouse", "TownHouse", "Office"])
    .optional(),
  status: z.enum(["Rent", "Sale"]).optional(),
  bedrooms: z
    .number({
      invalid_type_error: "Bedrooms must be a number",
    })
    .int("Bedrooms must be an integer")
    .min(0, "Bedrooms cannot be negative")
    .optional(),
  bathrooms: z
    .number({
      invalid_type_error: "Bathrooms must be a number",
    })
    .int("Bathrooms must be an integer")
    .min(0, "Bathrooms cannot be negative")
    .optional(),
  area: z
    .number({
      invalid_type_error: "Area must be a number",
    })
    .positive("Area must be greater than 0")
    .max(100000, "Area must be less than or equal to 1,000,00")
    .optional(),
  amenities: z.array(z.string().trim()).optional(),
  description: z.string().trim().min(1).optional(),
});

export const propertyValidation = {
  propertyCreateValidationSchema,
  propertyUpdateValidationSchema,
};
