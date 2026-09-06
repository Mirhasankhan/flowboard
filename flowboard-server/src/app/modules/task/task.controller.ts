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

const updateTask = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { taskId, title } = req.body;
  const result = await taskService.updateTaskInDB(taskId, userId, { title });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Task updated successfully.",
    data: result,
  });
});

const deleteTask = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { taskId } = req.params;
  await taskService.deleteTaskInDB(taskId, userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Task deleted successfully.",
  });
});

const moveTask = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { taskId, targetColumnId, targetIndex } = req.body;
  const result = await taskService.moveTaskInDB(
    taskId,
    userId,
    targetColumnId,
    targetIndex,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Task moved successfully.",
    data: result,
  });
});

export const taskController = {
  createNewTask,
  updateTask,
  deleteTask,
  moveTask,
};