import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { taskService } from "./task.service";

const createNewTask = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const payload = req.body;
  await taskService.createTaskInDB(userId, payload);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Task created successfully.",
  });
});

export const taskController = {
  createNewTask,
}