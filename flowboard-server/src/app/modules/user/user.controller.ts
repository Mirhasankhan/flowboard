import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userService } from "./user.services";

const createPendingUser = catchAsync(async (req, res) => {
  await userService.createPendingUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Check your email for the OTP to verify your account.",
  });
});

const verifyEmailAndCreateUser = catchAsync(async (req, res) => {
  const { email, otp } = req.body;
  await userService.verifyEmailAndCreateUser(email, otp);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Account verified successfully. You can now log in.",
  });
});

const myProfile = catchAsync(async (req, res) => {
  const user = await userService.getMyProfileFromDB(req.user.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Profile retrieved successfully.",
    data: user,
  });
});

export const UserControllers = {
  createPendingUser,
  verifyEmailAndCreateUser,
  myProfile,
};
