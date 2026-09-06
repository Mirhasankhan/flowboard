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


export const taskRoutes = router;
