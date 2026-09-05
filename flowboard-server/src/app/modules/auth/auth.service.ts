import prisma from "../../../shared/prisma";
import bcrypt from "bcryptjs";
import ApiError from "../../../errors/ApiErrors";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import generateOTP from "../../../helpers/generateOtp";
import sendEmail from "../../../helpers/sendEmail";
import { passwordResetEmailBody } from "../../../helpers/emailBody";
import { SignOptions } from "jsonwebtoken";
import { verifyGoogleIdToken } from "../../../helpers/googleAuth";

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

  if (user.isGoogleLogin) {
    throw new ApiError(
      400,
      "Account registered with Google. Use Google login or reset your password.",
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
    { id: user.id, email: user.email },
    config.jwt.jwt_secret as string,
    config.jwt.expires_in as any,
  );

  return {
    id: user.id,
    accessToken,
    email: user.email,
    fullName: user.fullName,
  };
};

const googleLoginIntoDB = async (idToken: string) => {
  const googleUser = await verifyGoogleIdToken(idToken);

  const googleId = googleUser.sub;
  const email = googleUser.email;
  const fullName = googleUser.name ?? email?.split("@")[0] ?? "";
    const profileImage = googleUser.picture;

  if (!googleId) {
    throw new ApiError(400, "Google user ID is missing");
  }

  if (!email) {
    throw new ApiError(400, "Google email is missing");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
      googleId: googleId,
    },
  });

  if (user) {
    const accessToken = jwtHelpers.generateToken(
      { id: user.id, email: user.email },
      config.jwt.jwt_secret as string,
      config.jwt.expires_in as SignOptions["expiresIn"],
    );
    return {
      id: user.id,
      accessToken,
      fullName: user.fullName,
      email: user.email,
    };
  }

  const newUser = await prisma.user.create({
    data: {
      email,
      fullName,
      password: "12345Aa#",
      isGoogleLogin: true,
      googleId,
      profileImage,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    { id: newUser.id, email: newUser.email },
    config.jwt.jwt_secret as string,
    config.jwt.expires_in as SignOptions["expiresIn"],
  );

  return {
    id: newUser.id,
    accessToken,
    email: newUser.email,
    fullName: newUser.fullName,
  };
};

const sendForgotPasswordOtpDB = async (email: string) => {
  const existringUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!existringUser) {
    throw new ApiError(404, "User not found");
  }

  // Generate OTP and expiry time
  const otp = generateOTP(); // 4-digit OTP
  const OTP_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minute
  const expiresAt = Date.now() + OTP_EXPIRATION_TIME;
  const subject = "Your Password Reset OTP";
  const html = passwordResetEmailBody(existringUser.fullName, otp);

  await sendEmail(email, subject, html);

  await prisma.otp.upsert({
    where: {
      email: email,
    },
    update: { otp: otp, expiresAt: new Date(expiresAt) },
    create: { email: email, otp: otp, expiresAt: new Date(expiresAt) },
  });

  return otp;
};

// verify otp code
const verifyForgotPasswordOtpCodeDB = async (payload: any) => {
  const { email, otp } = payload;

  if (!email && !otp) {
    throw new ApiError(400, "Email and OTP are required.");
  }

  const user = await prisma.user.findUnique({ where: { email: email } });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const userId = user.id;

  const verifyData = await prisma.otp.findUnique({
    where: {
      email: email,
    },
  });

  if (!verifyData) {
    throw new ApiError(400, "Invalid or expired OTP.");
  }

  const { otp: savedOtp, expiresAt } = verifyData;

  if (otp !== savedOtp) {
    throw new ApiError(401, "Invalid OTP.");
  }

  if (Date.now() > expiresAt.getTime()) {
    await prisma.otp.delete({
      where: {
        email: email,
      },
    }); // OTP has expired
    throw new ApiError(410, "OTP has expired. Please request a new OTP.");
  }

  // OTP is valid
  await prisma.otp.delete({
    where: {
      email: email,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    { id: userId, email },
    config.jwt.jwt_secret as string,
    config.jwt.expires_in as any,
  );

  return { accessToken: accessToken };
};

// reset password
const resetForgotPasswordDB = async (newPassword: string, userId: string) => {
  const existingUser = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
  });

  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.jwt.gen_salt),
  );

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  return;
};

export const authService = {
  loginUserIntoDB,
  googleLoginIntoDB,
  sendForgotPasswordOtpDB,
  verifyForgotPasswordOtpCodeDB,
  resetForgotPasswordDB,
};
