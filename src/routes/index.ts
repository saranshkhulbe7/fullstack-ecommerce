import productsRouter from "@/routes/products";
import authRouter from "@/routes/auth";
import { Application } from "express";

const routerConfig = {
  products: productsRouter,
  auth: authRouter,
};
export const registerRoutes = (app: Application) => {
  for (const [key, value] of Object.entries(routerConfig)) {
    app.use(`/${key}`, value);
  }
};
