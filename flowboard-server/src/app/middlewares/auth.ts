import { NextFunction, Request, Response } from "express";
import { JwtPayload, Secret } from "jsonwebtoken";
import httpStatus from "http-status";

import config from "../../config";
import ApiError from "../../errors/ApiErrors";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import prisma from "../../shared/prisma";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: JwtPayload },
    res: Response,
    next: NextFunction,
  ) => {
    try { 
      let token = req.cookies?.accessToken;

      if (!token) {
        const authorizationHeader = req.headers.authorization;

        if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
          token = authorizationHeader.split(" ")[1];
        }
      }

      if (!token) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "You are not authorized! No token provided.",
        );
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret as Secret,
      );

      req.user = verifiedUser;

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          "Forbidden! You are not authorized!",
        );
      }

      const user = await prisma.user.findUnique({
        where: {
          id: verifiedUser.id,
        },
      })

      if (!user) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "You are not authorized! User not found.",
        );
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
