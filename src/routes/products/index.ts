import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "./products.controllers";
import { validateData } from "@/middlewares/validation.middlewares";
import { createInsertSchema } from "drizzle-zod";
import { productTable } from "@/db/schema";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProductById);
router.post(
  "/",
  validateData(createInsertSchema(productTable).omit({ id: true }).strict()),
  createProduct
);
router.put(
  "/:id",
  validateData(
    createInsertSchema(productTable).omit({ id: true }).partial().strict()
  ),
  updateProduct
);
router.delete("/:id", deleteProduct);
export default router;
