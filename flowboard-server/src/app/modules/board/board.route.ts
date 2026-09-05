import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { boardController } from "./board.controller";
import { boardValidation } from "./board.validation";

const router = express.Router();

router.post(
  "/create",
  auth(),
  validateRequest(boardValidation.boardSchema),
  boardController.createNewBoard,
);
router.get("/user-wise", auth(), boardController.userWiseBoards);
router.get("/details/:id", auth(), boardController.getBoardById);
router.get(
  "/uninvited-members/:id",
  auth(),
  boardController.getUnInvitedMembersByBoardId,
);
router.put(
  "/update",
  auth(),
  validateRequest(boardValidation.boardUpdateSchema),
  boardController.updateBoard,
);
router.delete("/delete/:id", auth(), boardController.deleteBoard);
router.post(
  "/invite-member",
  auth(),
  validateRequest(boardValidation.inviteMemberSchema),
  boardController.inviteMemberToBoard,
);

export const boardRoutes = router;
