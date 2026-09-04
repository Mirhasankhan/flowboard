import express from "express";
import { authController } from "./auth.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { authValidation } from "./auth.validation";
import rateLimiter from "../../middlewares/rateLimiter";

const router = express.Router();

router.post(
  "/login",
  rateLimiter(1, 3),
  validateRequest(authValidation.loginSchema),
  authController.loginUser,
);
router.post(
  "/send-otp",
  rateLimiter(1, 2),
  validateRequest(authValidation.sendOtpSchema),
  authController.sendForgotPasswordOtp,
);
router.post(
  "/verify-otp", 
  validateRequest(authValidation.verifyOtpSchema),
  authController.verifyForgotPasswordOtpCode,
);
router.patch(
  "/reset-password",
  auth(),
  validateRequest(authValidation.resetPasswordSchema),
  authController.resetPassword,
);
router.post("/logout", auth(), authController.logout);

export const authRoute = router;
