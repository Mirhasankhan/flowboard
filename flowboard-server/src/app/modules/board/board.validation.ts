import { z } from "zod";

const boardSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(6, "Description must be at least 6 characters long"),
});

const boardUpdateSchema = z
  .object({
    boardId: z.string().uuid("Invalid Board ID"),
    title: z
      .string()
      .min(3, "Title must be at least 3 characters long")
      .optional(),
    description: z
      .string()
      .min(6, "Description must be at least 6 characters long")
      .optional(),
  })
  .refine(
    (data) => data.title !== undefined || data.description !== undefined,
    {
      message:
        "At least one of title or description must be provided for update",
      path: ["title"],
    },
  );

const inviteMemberSchema = z.object({
  userId: z.string().uuid("Invalid User ID"),
  boardId: z.string().uuid("Invalid Board ID"),
  role: z.enum(["VIEWER", "EDITOR"]),
});

export const boardValidation = {
  boardSchema,
  boardUpdateSchema,
  inviteMemberSchema,
};
