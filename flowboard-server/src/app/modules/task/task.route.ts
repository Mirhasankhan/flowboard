import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { taskController } from "./task.controller";
import { taskValidation } from "./task.validation";
import rateLimiter from "../../middlewares/rateLimiter";


const router = express.Router();

router.post(
  "/create",
  auth(),
  rateLimiter(1, 6),
  validateRequest(taskValidation.taskSchema),
  taskController.createNewTask,
);

router.put(
  "/update",
  auth(),
  rateLimiter(1, 4),
  validateRequest(taskValidation.taskUpdateSchema),
  taskController.updateTask,
);

router.put(
  "/move",
  auth(),
  rateLimiter(1, 8),
  validateRequest(taskValidation.taskMoveSchema),
  taskController.moveTask,
);

router.delete(
  "/delete/:taskId",
  auth(),
  rateLimiter(1, 6),
  taskController.deleteTask,
);

export const taskRoutes = router;
