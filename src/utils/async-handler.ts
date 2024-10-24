import { NextFunction, Request, Response } from "express";

export const asyncHandler = (
  requestHandler: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> // Explicitly mark as returning a Promise
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler(req, res, next);
    } catch (e) {
      next(e);
    }
  };
};
