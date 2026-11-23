import type { Request, Response, NextFunction } from "express";
import AppError from "../utils/app.error.js";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Handle Prisma unique constraint error
  if ("code" in err && err.code === "P2002") {
    res.status(409).json({
      success: false,
      message: "A record with this value already exists",
    });

    return;
  }

  const statusCode =
    err instanceof AppError ? err.statusCode : 500;

  const message =
    err instanceof AppError
      ? err.message
      : "Internal Server Error";

  if (statusCode === 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};