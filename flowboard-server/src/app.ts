import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import cors from "cors";
import router from "./app/routes";
import GlobalErrorHandler from "./app/middlewares/globalErrorHandler";
import prisma from "./shared/prisma";
import cookieParser from "cookie-parser";
import config from "./config";

const app: Application = express();

// Middleware setup
(async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("Failed to connect to services:", error);
    process.exit(1);
  }
})();

app.use(cors({ origin: config.corsOrigins, credentials: true }));

app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


// Route handler for root endpoint
app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Welcome to api main route",
  });
});

// Router setup
app.use("/api/v1", router);

// Global Error Handler
app.use(GlobalErrorHandler);

// API Not found handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});

export default app;
