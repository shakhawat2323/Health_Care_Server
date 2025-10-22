import { UserStatus } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../helpers/jwthelpers";

const UserLogin = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const ishashpassword = await bcrypt.compare(payload.password, user.password);
  console.log(ishashpassword, "password");
  if (!ishashpassword) {
    throw new Error("Password is incorrect!");
  }

  const accessToken = jwtHelpers.generateToken(
    { email: user.email, role: user.role },
    config.jwtsecret as string,
    config.jwtexpers as string
  );
  const refreshToken = jwtHelpers.generateToken(
    { email: user.email, role: user.role },
    config.jwtsecret as string,
    config.jwtrefiesh as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: user.needPasswordChange,
  };
};

export const UserSErvices = {
  UserLogin,
};
