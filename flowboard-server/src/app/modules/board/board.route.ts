import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { boardController } from "./board.controller";
import { boardValidation } from "./board.validation";
import rateLimiter from "../../middlewares/rateLimiter";

const router = express.Router();

router.post(
  "/create",
  auth(),
  rateLimiter(1, 3),
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
  rateLimiter(1, 2),
  validateRequest(boardValidation.boardUpdateSchema),
  boardController.updateBoard,
);
router.delete("/delete/:id", auth(), boardController.deleteBoard);
router.post(
  "/invite-member",
  auth(),
  rateLimiter(1, 4),
  validateRequest(boardValidation.inviteMemberSchema),
  boardController.inviteMemberToBoard,
);

router.delete("/remove-member/:id", auth(), boardController.removeMemberFromBoard);
router.patch("/update-member-role/:id", auth(), boardController.updateMemberRole);

export const boardRoutes = router;
