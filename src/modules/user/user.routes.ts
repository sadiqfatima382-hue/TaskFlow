import { Router } from "express";

import { userController } from "./user.controller.js";
import { registerUserSchema } from "./user.validation.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.post("/register",  validate(registerUserSchema),  userController.registerUser);

router.get("/:id", userController.getUserById);

export default router;