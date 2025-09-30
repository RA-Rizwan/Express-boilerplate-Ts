import type { Request, Response, NextFunction } from "express";
import { MESSAGES } from "../constants/messages.constant";
import { ApiResponseUtil } from "../utils/apiResponse";


export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || MESSAGES.SERVER_ERROR;

  res.status(statusCode).json(ApiResponseUtil.error(message, err.stack));
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404).json(ApiResponseUtil.error(MESSAGES.NOT_FOUND));
};
