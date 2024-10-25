import jwt from "jsonwebtoken";
type UserInfo = {
  id: number;
  role: string;
};

export const generateAccessToken = (userInfo: UserInfo) => {
  return jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};
