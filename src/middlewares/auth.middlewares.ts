import { UserEncodeInfo } from "@/routes/auth/utils";
import { ApiError } from "@/utils/ApiError";
import { asyncHandler } from "@/utils/async-handler";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyRole = (role: string) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const token =
        req.cookies.accessToken ??
        req.body.accessToken ??
        req.headers.authorization?.replace("Bearer ", "");
      if (!token) {
        res.status(401).json({ message: "Access denied11" });
        return;
      }
      try {
        var decoded = jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET
        ) as UserEncodeInfo;
      } catch (error) {
        throw new ApiError(401, "Access denied22");
      }
      if (decoded.role !== role) {
        throw new ApiError(401, `Access denied, you are not a ${role}`);
      }
      next();
    }
  );
};

export const verifyAdmin = verifyRole("admin");
export const verifySeller = verifyRole("seller");
