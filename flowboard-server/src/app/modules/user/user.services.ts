import config from "../../../config";
import ApiError from "../../../errors/ApiErrors";
import prisma from "../../../shared/prisma";
import bcrypt from "bcryptjs";
import { Request } from "express";
import { uploadInSpace } from "../../../helpers/uploadInSpace";

const getMyProfileFromDB = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,     
      profileImage: true,
    },
  });

  if (!user) throw new ApiError(404, "User not found");

  return user;
};

const updateProfileIntoDB = async (req: Request) => {
  const userId = req.user.id;
  const userData = req.body;
  const file = req.file as Express.Multer.File | undefined;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new ApiError(404, "User not found for edit");

  let profileImage;
  if (file) {
    profileImage = await uploadInSpace(file, "users/profileImage");
  }
  await prisma.user.update({
    where: { id: userId },
    data: {
      firstName: userData.firstName || user.firstName,
      lastName: userData.lastName || user.lastName,     
      profileImage: file ? profileImage : user.profileImage,
    },
  });

  return;
};

const changePassword = async (
  newPassword: string,
  userId: string,
  oldPassword: string,
) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new ApiError(404, "User not found");

  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordValid) throw new ApiError(401, "Wrong old password");

  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.jwt.gen_salt),
  );

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
    },
  });
  return;
};

export const userService = {
  getMyProfileFromDB,
  updateProfileIntoDB,
  changePassword,
};
