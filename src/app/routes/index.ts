import express from "express";
import { UserRouter } from "../modules/user/user.routes";
import { UserAuth } from "../modules/auth/auth.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRouter,
  },
  {
    path: "/auth",
    route: UserAuth,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
