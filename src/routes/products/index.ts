import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProdcutById,
  listProducts,
  updateProduct,
} from "./products.controllers";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProdcutById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
export default router;
