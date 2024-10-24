import { ApiError } from "@/utils/ApiError";
import { NextFunction, Request, Response } from "express";

type ErrorResponse = {
  message: string;
  stack?: string;
} & Record<string, unknown>;

const errorHandler = <E extends Error>(
  err: E,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: ApiError;
  if (!(err instanceof ApiError)) {
    const statusCode = (err as any)?.statusCode ?? 500;
    const message = err?.message ?? "Something went wrong";
    const errors = (err as any)?.errors ?? [];

    error = new ApiError(statusCode, message, errors, err?.stack || "");
  } else {
    error = err;
  }
  const response: ErrorResponse = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };

  res.status(error.statusCode || 500).json(response);
};

export { errorHandler };
