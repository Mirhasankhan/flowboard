import { z } from "zod";

const taskSchema = z.object({
    columnId: z.string().cuid("Invalid Board ID"),
    title: z.string().min(3, "Title must be at least 3 characters long"),
});



export const taskValidation = {
    taskSchema
};
