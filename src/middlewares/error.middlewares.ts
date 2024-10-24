import { ApiError } from "@/utils/ApiError";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

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
  if (err instanceof ApiError) {
    error = err;
  } else if (err instanceof ZodError) {
    const errors = err.errors.map((issue: any) => ({
      field: issue.path.join("."),
      errorMessage: issue.message,
    }));
    error = new ApiError(422, "Zod Error", errors, err?.stack || "");
  } else {
    const statusCode = (err as any)?.statusCode ?? 500;
    const message = err?.message ?? "Something went wrong";
    const errors = (err as any)?.errors ?? [];
    error = new ApiError(statusCode, message, errors, err?.stack || "");
  }
  const response: ErrorResponse = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };

  res.status(error.statusCode || 500).json(response);
};

export { errorHandler };
