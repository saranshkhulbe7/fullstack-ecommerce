import express from "express";
import productsRouter from "./routes/products";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/products", productsRouter);
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
