import { z } from "zod";


const userChangePasswordValidationSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(6, "New password must be at least 6 characters long"),
});

export const userValidation = {  
  userChangePasswordValidationSchema,
};
