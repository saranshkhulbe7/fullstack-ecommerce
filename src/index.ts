import express, { json, urlencoded } from "express";
import { errorHandler } from "@/middlewares";
import { registerRoutes } from "./routes";

function startServer() {
  const PORT = 3000;
  const app = express();
  app.use(urlencoded({ extended: false }));
  app.use(json());

  app.get("/", (req, res) => {
    res.json({
      message: `Server is running on port ${PORT}`,
      healthcheck: "ok",
    });
  });

  registerRoutes(app);
  app.use(errorHandler);
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
}

startServer();
