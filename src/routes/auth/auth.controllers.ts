import { asyncHandler } from "@/utils/async-handler";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { ApiResponse } from "@/utils/ApiResponse";
import { eq } from "drizzle-orm";
import { generateAccessToken } from "./utils";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, address } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const [user] = await db
    .insert(usersTable)
    .values({
      name,
      email,
      password: hashedPassword,
      address,
    })
    .returning();
  res.status(201).json(
    new ApiResponse(
      201,
      {
        name: user.name,
        email: user.email,
        address: user.address,
      },
      "User created successfully"
    )
  );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (!user) {
    res.status(404).json(new ApiResponse(401, null, "Authentication failed"));
  }
  const doesPasswordMatch = await bcrypt.compare(password, user.password);
  if (!doesPasswordMatch) {
    res
      .status(401)
      .json(
        new ApiResponse(
          401,
          { password: user.password },
          "Authentication failed"
        )
      );
  }
  // authentication passed, create a token
  const accessToken = generateAccessToken({ id: user.id, role: user.role });
  res
    .status(200)
    .json(new ApiResponse(200, { accessToken }, "Authentication successful"));
});
