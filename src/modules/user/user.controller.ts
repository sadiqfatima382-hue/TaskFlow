
  import type { Request, Response, NextFunction } from "express";

  import { userService } from "./user.service.js";

interface RegisterUserBody {
  name: string;
  email: string;
  password: string;
}

class UserController {
  registerUser = async (
    req: Request<{}, {}, RegisterUserBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await userService.registerUser(req.body);

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: (error as Error).message,
        
      });
    }
  };

  getUserById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await userService.getUserById(req.params.id);

      res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: (error as Error).message,
      });
    }
  };
}

export const userController = new UserController();
