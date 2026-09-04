import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { fileUploader } from "../../../helpers/fileUploader";
import { parseBodyData } from "../../middlewares/parseBodyData";

const router = express.Router();

router.get("/my-profile", auth(), UserControllers.myProfile);
router.put(
  "/update-profile",
  auth(),
  fileUploader.profileImage,
  parseBodyData,
  UserControllers.updateProfile,
);
router.put(
  "/change-password",
  auth(),
  validateRequest(userValidation.userChangePasswordValidationSchema),
  UserControllers.changePassword,
);

export const userRoutes = router;
