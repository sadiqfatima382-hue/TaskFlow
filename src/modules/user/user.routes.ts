
import { Router } from "express";

import { userController } from "./user.controller.js";

const router = Router();

// Register a new user
router.post("/register", userController.registerUser);

// Get user profile by ID
router.get("/:id", userController.getUserById);

export default router;
