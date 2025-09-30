import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ApiResponseUtil } from "../utils/apiResponse.js";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json(ApiResponseUtil.validationError(errors.array()));
    return;
  }

  next();
};
