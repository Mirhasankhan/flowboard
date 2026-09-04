import prisma from "../../../shared/prisma";
import bcrypt from "bcryptjs";
import ApiError from "../../../errors/ApiErrors";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import generateOTP from "../../../helpers/generateOtp";
import sendEmail from "../../../helpers/sendEmail";

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.status === "Blocked") {
    throw new ApiError(
      400,
      "Your account has been blocked. Please contact support for assistance.",
    );
  }
  if (user.status === "Deleted") {
    throw new ApiError(
      400,
      "Your account has been deleted. Please contact support for assistance.",
    );
  }

  const isPasswordValid = await bcrypt.compare(
    payload.password,
    user?.password,
  );

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = jwtHelpers.generateToken(
    { id: user.id, email: user.email, role: user.role },
    config.jwt.jwt_secret as string,
    config.jwt.expires_in as any,
  );

  return {
    id: user.id,
    accessToken,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

const sendForgotPasswordOtpDB = async (email: string) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!existingUser) {
    throw new ApiError(404, "User not found");
  }
  const otp = generateOTP();

  await prisma.otp.upsert({
    where: { email },
    update: {
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      failedAttempts: 0,
      lockedUntil: null,
    },
    create: {
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      failedAttempts: 0,
    },
  });

  const emailSubject = "Your Password Reset OTP";
  const emailHtml = `<div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Password Reset Request</h2>
        <p>Hi <b>${existingUser.firstName} ${existingUser.lastName}</b>,</p>
        <p>Your OTP for password reset is:</p>
        <h1 style="color: #007BFF;">${otp}</h1>
        <p>This OTP is valid for <b>5 minutes</b>. If you did not request this, please ignore this email.</p>
        <p>Thanks, <br>The Support Team</p>
      </div>`;

  await sendEmail(email, emailSubject, emailHtml);

  return;
};

const verifyForgotPasswordOtpCodeDB = async (payload: {
  email: string;
  otp: string;
}) => {
  const { email, otp } = payload;

  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const userId = user.id;

  const savedOtpRecord = await prisma.otp.findUnique({ where: { email } });
  if (!savedOtpRecord) {
    throw new ApiError(400, "OTP not found. Please request a new one.");
  }

  if (savedOtpRecord.lockedUntil && new Date() < savedOtpRecord.lockedUntil) {
    throw new ApiError(
      429,
      "Too many failed attempts. Please try again later.",
    );
  }

  if (new Date() > savedOtpRecord.expiresAt) {
    await prisma.otp.delete({ where: { email } });
    throw new ApiError(400, "OTP has expired. Please request a new one.");
  }
  if (otp !== savedOtpRecord.otp) {
    const failedAttempts = savedOtpRecord.failedAttempts + 1;

    if (failedAttempts >= 3) {
      await prisma.otp.update({
        where: { email },
        data: {
          failedAttempts,
          lockedUntil: new Date(Date.now() + 1 * 60 * 1000),
        },
      });

      throw new ApiError(
        429,
        "Too many failed attempts. OTP verification locked for 1 minutes.",
      );
    }

    await prisma.otp.update({
      where: { email },
      data: {
        failedAttempts,
      },
    });

    throw new ApiError(401, "Invalid OTP.");
  }

  await prisma.otp.delete({ where: { email } });

  const forgetToken = jwtHelpers.generateToken(
    { id: userId, email },
    config.jwt.jwt_secret as string,
    config.jwt.forget_expires_in as any,
  );

  return { forgetToken };
};

const resetForgotPasswordDB = async (newPassword: string, userId: string) => {
  const existingUser = await prisma.user.findUnique({ where: { id: userId } });
  if (!existingUser) {
    throw new ApiError(404, "user not found");
  }
  const email = existingUser.email as string;
  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.jwt.gen_salt),
  );

  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      password: hashedPassword,
    },
  });
  return;
};

export const authService = {
  loginUserIntoDB,
  sendForgotPasswordOtpDB,
  verifyForgotPasswordOtpCodeDB,
  resetForgotPasswordDB,
};
