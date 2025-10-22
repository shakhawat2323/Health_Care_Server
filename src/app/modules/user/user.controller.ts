import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import pick from "../../helpers/pick";

const createPatien = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.cratepatien(req);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Patien Create SuccessFUlly",
    data: result,
  });
});
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createAdmin(req);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Patien Create SuccessFUlly",
    data: result,
  });
});
const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createDoctor(req);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Patien Create SuccessFUlly",
    data: result,
  });
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["status", "email", "role"]);
  const Option = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  const result = await UserService.getAllusers(filters, Option);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Patien Create SuccessFUlly",
    data: result,
  });
});

export const UserController = {
  createPatien,
  createAdmin,
  createDoctor,
  getAllUsers,
};
