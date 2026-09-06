import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { boardService } from "./board.service";

const createNewBoard = catchAsync(async (req, res) => {
  const ownerId = req.user.id;
  const payload = req.body;
  await boardService.createNewBoardIntoDB(ownerId, payload);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Board created successfully.",
  });
});

const userWiseBoards = catchAsync(async (req, res) => {
  const userId = req.user.id
  const boards = await boardService.getUserWiseBoardsFromDB(userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User-wise boards retrieved successfully.",
    data: boards,
  });
});

const getBoardById = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const boardId = req.params.id;
  const board = await boardService.getBoardByIdFromDB(userId, boardId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Board retrieved successfully.",
    data: board,
  });
});

const updateBoard = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const payload = req.body;
  const boardId = req.body.boardId;

  await boardService.updateBoardByIdInDB(userId, boardId, payload);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Board updated successfully.",
  });
});

const deleteBoard = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const boardId = req.params.id;

  await boardService.deleteBoardByIdInDB(userId, boardId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Board deleted successfully.",
  });
});

const getUnInvitedMembersByBoardId = catchAsync(async (req, res) => {
  const boardId = req.params.id;
  const members =
    await boardService.getUnInvitedMembersByBoardIdFromDB(boardId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Uninvited members retrieved successfully.",
    data: members,
  });
});

const inviteMemberToBoard = catchAsync(async (req, res) => {
  const userId = req.user.id
  const paylod = req.body;
  await boardService.inviteMemberToBoardInDB(userId, paylod);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Member invited to board successfully.",
  });
});

const removeMemberFromBoard = catchAsync(async (req, res) => {
  const userId = req.user.id
  const memberId = req.params.id;
  await boardService.removeMemberFromBoardInDB(userId, memberId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Member removed from board successfully.",
  });
});

export const boardController = {
  createNewBoard,
  userWiseBoards,
  getBoardById,
  getUnInvitedMembersByBoardId,
  updateBoard,
  deleteBoard,
  inviteMemberToBoard,
  removeMemberFromBoard,
};
