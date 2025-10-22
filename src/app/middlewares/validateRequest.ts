import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

const ValidateRequest =
  (Schema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Schema.parseAsync({
        body: req.body,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };

export default ValidateRequest;
