import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { fileUploader } from "../../../helpers/fileUploadHelper";
import rateLimiter from "../../middlewares/rateLimiter";

const router = express.Router();

router.post(
  "/create-pending",
  rateLimiter(1, 3),
  validateRequest(userValidation.createPendingUserSchema),
  UserControllers.createPendingUser,
);
router.post(
  "/verify-email",
  rateLimiter(1, 3),
  validateRequest(userValidation.verifyEmailSchema),
  UserControllers.verifyEmailAndCreateUser,
);
router.get("/my-profile", auth(), UserControllers.myProfile);
router.put(
  "/profile-update",
  auth(),
  rateLimiter(1, 3),
  fileUploader.profileImage,
  UserControllers.updateMyProfile,
);

export const userRoutes = router;
