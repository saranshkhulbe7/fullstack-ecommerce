import { Request, Response } from "express";

export function listProducts(req: Request, res: Response) {
  res.send("product listed");
}
// create update delete
export function getProdcutById(req: Request, res: Response) {
  res.send("product id get");
}
export function createProduct(req: Request, res: Response) {
  res.send("product created");
}
export function updateProduct(req: Request, res: Response) {
  res.send("product updated");
}
export function deleteProduct(req: Request, res: Response) {
  res.send("product deleted");
}
