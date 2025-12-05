import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { createAuthService } from "../services/auth.service";
import { RegisterDto, LoginDto } from "../dto/auth.dto";
import { logger } from "../config/logger";
import { createUserRepository } from "../repositories/user.repositories";
import { sendSuccess } from "../utils/response";
import { plainToInstance } from "class-transformer";
import { UserResponseDto } from "../dto/user-response.dto";
import { createError } from "../utils/api-error";

const userRepo = createUserRepository();
const authService = createAuthService(userRepo);

export const registerHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const body = req.body;

    const user = await authService.register(body.email, body.password, body.role);
    if (!user) throw createError("User registration failed", 400);

    logger.info(`User registered: ${user.email}`);

    const transformedUser = plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true
    });

    sendSuccess(res, 201, "User registered successfully", transformedUser);
  }
);

export const loginHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const body = req.body;

    const token = await authService.login(body.email, body.password);
    if (!token) throw createError("Invalid credentials", 401);

    sendSuccess(res, 200, "Login successful", { token });
  }
);

export const profileHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) throw createError("Unauthorized", 401);

    sendSuccess(res, 200, "Profile fetched successfully", { user: req.user });
  }
);
