import express, { json, urlencoded } from "express";
import productsRouter from "./routes/products";

function startServer() {
  const PORT = 3000;
  const app = express();
  app.use(urlencoded({ extended: false }));
  app.use(json());

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/products", productsRouter);
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
}

startServer();
