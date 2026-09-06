import { z } from "zod";

const taskSchema = z.object({
    columnId: z.string().cuid("Invalid Board ID"),
    title: z.string().min(3, "Title must be at least 3 characters long"),
});



const taskUpdateSchema = z.object({
  taskId: z.string().cuid("Invalid Task ID"),
  title: z.string().min(1, "Title must be at least 1 character long"),
});

const taskMoveSchema = z.object({
  taskId: z.string().cuid("Invalid Task ID"),
  targetColumnId: z.string().cuid("Invalid Column ID"),
  targetIndex: z
    .number()
    .int()
    .min(0, "Target index must be a non-negative integer"),
});

export const taskValidation = {
  taskSchema,
  taskUpdateSchema,
  taskMoveSchema,
};
