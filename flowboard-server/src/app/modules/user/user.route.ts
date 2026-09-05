import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-pending",
  validateRequest(userValidation.createPendingUserSchema),
  UserControllers.createPendingUser,
);
router.post(
  "/verify-email",
  validateRequest(userValidation.verifyEmailSchema),
  UserControllers.verifyEmailAndCreateUser,
);
router.get("/my-profile", auth(), UserControllers.myProfile);

export const userRoutes = router;
