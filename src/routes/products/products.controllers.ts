import { Request, Response } from "express";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { asyncHandler } from "@/utils/async-handler";
import { ApiResponse } from "@/utils/ApiResponse";
import { eq } from "drizzle-orm";

export const listProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await db.select().from(productTable);
    res.status(200).json(new ApiResponse(200, products));
  }
);
export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [product] = await db
      .select()
      .from(productTable)
      .where(eq(productTable.id, id));
    if (!product) {
      res.status(404).json(new ApiResponse(404, null, "Product not found"));
    }
    res.status(200).json(new ApiResponse(200, product));
  }
);
export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, price, image, description } = req.body;
    const [product] = await db
      .insert(productTable)
      .values({ name, price, image, description })
      .returning();
    res
      .status(201)
      .json(new ApiResponse(201, product, "Product created Successfully"));
  }
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name, price, image, description } = req.body;
    const [updateProduct] = await db
      .update(productTable)
      .set({ name, price, image, description })
      .where(eq(productTable.id, id))
      .returning();
    if (!updateProduct) {
      res.status(404).json(new ApiResponse(404, null, "Product not found"));
    }
    res
      .status(200)
      .json(
        new ApiResponse(200, updateProduct, "Product updated successfully")
      );
  }
);
export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [deletedProduct] = await db
      .delete(productTable)
      .where(eq(productTable.id, id))
      .returning();
    if (!deletedProduct) {
      res.status(404).json(new ApiResponse(404, null, "Product not found"));
    }
    res
      .status(200)
      .json(
        new ApiResponse(200, deletedProduct, "Product deleted successfully")
      );
  }
);
