import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userService } from "./user.services";

const myProfile = catchAsync(async (req, res) => {
  const user = await userService.getMyProfileFromDB(req.user.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Profile retrieved successfully.",
    data: user,
  });
});
const updateProfile = catchAsync(async (req, res) => {
  await userService.updateProfileIntoDB(req);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Profile updated successfully.",
  });
});
const changePassword = catchAsync(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  await userService.changePassword(newPassword, req.user.id, oldPassword);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Password changed successfully.",
  });
});

export const UserControllers = {
  myProfile,
  updateProfile,
  changePassword,
};
