import { Router } from "express";
import { login, register } from "./auth.controllers";
import { validateData } from "@/middlewares/validation.middlewares";
import { loginUserSchema, registerUserSchema } from "@/db/schema";
const router = Router();

router.post("/register", validateData(registerUserSchema), register);
router.post("/login", validateData(loginUserSchema), login);

export default router;
