import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { taskController } from "./task.controller";
import { taskValidation } from "./task.validation";


const router = express.Router();

router.post(
  "/create",
  auth(),
  validateRequest(taskValidation.taskSchema),
  taskController.createNewTask,
);

router.put(
  "/update",
  auth(),
  validateRequest(taskValidation.taskUpdateSchema),
  taskController.updateTask,
);

router.put(
  "/move",
  auth(),
  validateRequest(taskValidation.taskMoveSchema),
  taskController.moveTask,
);

router.delete(
  "/delete/:taskId",
  auth(),
  taskController.deleteTask,
);

export const taskRoutes = router;
