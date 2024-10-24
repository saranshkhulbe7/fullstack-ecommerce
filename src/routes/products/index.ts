import { Router } from "express";

export const productsRouter = Router();

productsRouter.get("/", (req, res) => {
  res.send("Products");
});

productsRouter.post("/", (req, res) => {
  res.send("Products");
});
productsRouter.get("/:id", (req, res) => {
  res.send("Products");
});
