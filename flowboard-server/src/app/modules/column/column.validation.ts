import { z } from "zod";

const columnSchema = z.object({
  boardId: z.string().cuid("Invalid Board ID"),
  title: z.string().min(3, "Title must be at least 3 characters long"),
});

const columnUpdateSchema = z.object({
  columnId: z.string().cuid("Invalid Column ID"),
  title: z.string().min(3, "Title must be at least 3 characters long"),
});

const columnReorderSchema = z.object({
  columnId: z.string().cuid("Invalid Column ID"),
  targetIndex: z
    .number()
    .int()
    .positive("Target index must be a positive integer"),
});

export const columnValidation = {
  columnSchema,
  columnUpdateSchema,
  columnReorderSchema,
};
