import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "./products.controllers";
import { validateData } from "@/middlewares/validation.middlewares";
import { createProductSchema, updateProductSchema } from "@/db/schema";
import { verifyAdmin } from "@/middlewares/auth.middlewares";

const router = Router();

router.get("/", verifyAdmin, listProducts);
router.get("/:id", getProductById);
router.post("/", verifyAdmin, validateData(createProductSchema), createProduct);
router.put("/:id", validateData(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);
export default router;
