import bcrypt from "bcryptjs";
import { prisma } from "../../shared/prisma";
import { Request } from "express";
import { fileUplodes } from "../../helpers/fileUploders";
import { Doctor, UserRole } from "@prisma/client";

const cratepatien = async (req: Request) => {
  if (req.file) {
    const fileuploder = await fileUplodes.UploadeToCloudinary(req.file);
    req.body.patient.profilePhoto = fileuploder?.secure_url;
  }
  const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
  const haspassword = await bcrypt.hash(req.body.password, saltRounds);
  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: {
        email: req.body.patient.email,
        password: haspassword,
      },
    });
    return await tx.patient.create({
      data: req.body.patient,
    });
  });
  console.log(result, "result data serveice");
  return result;
};
const createAdmin = async (req: Request) => {
  if (req.file) {
    const fileuploder = await fileUplodes.UploadeToCloudinary(req.file);
    req.body.admin.profilePhoto = fileuploder?.secure_url;
  }
  const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
  const haspassword = await bcrypt.hash(req.body.password, saltRounds);

  const UserData = {
    email: req.body.admin.email,
    password: haspassword,
    role: UserRole.ADMIN,
  };
  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: UserData,
    });
    return await tx.admin.create({
      data: req.body.admin,
    });
  });
  console.log(result, "result data serveice");
  return result;
};
const createDoctor = async (req: Request): Promise<Doctor> => {
  const file = req.file;

  if (file) {
    const fileuploder = await fileUplodes.UploadeToCloudinary(file);
    req.body.doctor.profilePhoto = fileuploder?.secure_url;
  }
  const hashedPassword: string = await bcrypt.hash(req.body.password, 10);

  const userData = {
    email: req.body.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdDoctorData = await transactionClient.doctor.create({
      data: req.body.doctor,
    });

    return createdDoctorData;
  });

  return result;
};
const getAllusers = async (params: any, Option: any) => {
  const pageNambur = page || 1;
  const LimitNambur = limit || 10;
  const skip = (pageNambur - 1) * LimitNambur;
  const result = await prisma.user.findMany({
    skip,
    take: LimitNambur,
    where: {
      email: {
        contains: searchTerm,
        mode: "insensitive",
      },
      role: role,

      status: status,
    },
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });
  return result;
};
export const UserService = {
  cratepatien,
  createAdmin,
  createDoctor,
  getAllusers,
};
