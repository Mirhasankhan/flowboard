import { PendingUser } from "@prisma/client/wasm";
import ApiError from "../../../errors/ApiErrors";
import generateOTP from "../../../helpers/generateOtp";
import prisma from "../../../shared/prisma";
import bcrypt from "bcryptjs";
import { emailBody } from "../../../helpers/emailBody";
import sendEmail from "../../../helpers/sendEmail";

const createPendingUserIntoDB = async (payload: PendingUser) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });
  if (existingUser) {
    throw new ApiError(409, "Email already exists!");
  }

  const hashedPassword = await bcrypt.hash(payload.password as string, 10);
  const otp = generateOTP();

  const OTP_EXPIRATION_TIME = 5 * 60 * 1000;
  const expiresAt = Date.now() + OTP_EXPIRATION_TIME;
  const subject = "Your Account Verification OTP";
  const html = emailBody(payload.fullName, otp);

  await sendEmail(payload.email, subject, html);

  await prisma.pendingUser.upsert({
    where: {
      email: payload.email,
    },
    update: { otpCode: otp, expiresAt: new Date(expiresAt) },
    create: {
      ...payload,
      password: hashedPassword,
      otpCode: otp,
      expiresAt: new Date(expiresAt),
    },
  });

  return;
};

const verifyEmailAndCreateUser = async (email: string, otp: string) => {
  return await prisma.$transaction(async (tx) => {
    const existingUser = await tx.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ApiError(409, "User Already exists!");
    }

    const userPending = await tx.pendingUser.findUnique({
      where: { email },
    });

    if (!userPending) {
      throw new ApiError(409, "User doesn't exist!");
    }

    const { otpCode, expiresAt, fullName, password } = userPending;

    if (otp !== otpCode) {
      throw new ApiError(401, "Invalid OTP.");
    }

    if (Date.now() > expiresAt.getTime()) {
      await tx.pendingUser.delete({
        where: {
          email,
        },
      });

      throw new ApiError(410, "OTP has expired. Please request a new OTP.");
    }

    // OTP is valid → remove pending user
    await tx.pendingUser.delete({
      where: {
        email,
      },
    });

    // Create actual user
    await tx.user.create({
      data: {
        email,
        password,
        fullName       
      },
    });

    return;
  });
};

const getMyProfileFromDB = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      fullName: true,
      profileImage: true,
    },
  });

  return user;
};

export const userService = {
  createPendingUserIntoDB,
  verifyEmailAndCreateUser,
  getMyProfileFromDB,
};
