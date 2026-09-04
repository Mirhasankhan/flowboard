import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { authService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";

const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUserIntoDB(req.body);

  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User successfully logged in",
  });
});

const sendForgotPasswordOtp = catchAsync(
  async (req: Request, res: Response) => {
    const email = req.body.email as string;
    await authService.sendForgotPasswordOtpDB(email);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "OTP send successfully",
    });
  },
);

const verifyForgotPasswordOtpCode = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const response = await authService.verifyForgotPasswordOtpCodeDB(payload);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "OTP verified successfully.",
      data: response,
    });
  },
);

const resetPassword = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { newPassword } = req.body;
  const result = await authService.resetForgotPasswordDB(newPassword, userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password updated successfully.",
    data: result,
  });
});

const logout = catchAsync(async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Logged out successfully",
  });
});

export const authController = {
  loginUser,
  sendForgotPasswordOtp,
  verifyForgotPasswordOtpCode,
  resetPassword,
  logout,
};
