import express from "express";
import userRoutes from "./modules/user/user.routes.js";

const app = express();

// Global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "TaskFlow API is running",
  });
});

// User routes
app.use("/api/users", userRoutes);

export default app;
