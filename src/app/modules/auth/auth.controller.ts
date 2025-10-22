import { NextFunction, Request, Response } from "express";

import sendResponse from "../../shared/sendResponse";
import { UserSErvices } from "./auth.service";

const UserLoging = async (req: Request, res: Response, next: NextFunction) => {
  const result = await UserSErvices.UserLogin(req.body);
  const { accessToken, refreshToken, needPasswordChange } = result;
  res.cookie("accessToken", accessToken, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60,
  });
  res.cookie("refreshToken", refreshToken, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 24 * 90,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Login SuccessFUlly",
    data: {
      needPasswordChange,
    },
  });
};

export const AuthController = {
  UserLoging,
};
