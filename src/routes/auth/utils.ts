import jwt from "jsonwebtoken";
export type UserEncodeInfo = {
  id: number;
  role: string;
};

export const generateAccessToken = (userInfo: UserEncodeInfo) => {
  return jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};
