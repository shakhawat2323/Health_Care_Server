import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import { fileUplodes } from "../../helpers/fileUploders";
import { UserValidation } from "./user.validation";

const route = express.Router();

route.get("/alluser", UserController.getAllUsers);

route.post(
  "/cratepatien",
  fileUplodes.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.CreatePatientValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    UserController.createPatien(req, res, next);
  }
);
route.post(
  "/crateadmin",
  fileUplodes.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createAdminSchema.parse(
      JSON.parse(req.body.data)
    );
    UserController.createAdmin(req, res, next);
  }
);
route.post(
  "/crateadoctor",
  fileUplodes.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createDoctorValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    UserController.createDoctor(req, res, next);
  }
);

export const UserRouter = route;
