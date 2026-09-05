import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { columnService } from "./column.service";

const createNewColumn = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const payload = req.body;
  await columnService.createNewColumn(userId, payload);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Column created successfully.",
  });
});

const updateColumnTitle = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { columnId, title } = req.body
  await columnService.updateColumnTitle(userId, columnId, title);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Column title updated successfully.",
  });
});

const reorderColumn = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { columnId, targetIndex } = req.body
  await columnService.reorderColumn(userId, columnId, targetIndex);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Column reordered successfully.",
  });
});

const deleteColumn = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { columnId, } = req.params
  await columnService.deleteColumnById(userId, columnId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Column deleted successfully.",
  });
});

export const columnController = {
  createNewColumn,
  updateColumnTitle,
  reorderColumn,
  deleteColumn,
};
