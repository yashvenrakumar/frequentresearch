import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import { registerUserService, checkUsernameService, resetPasswordService } from "../services/user.service";
import { sendResponse } from "../middleware/res.middleware";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {

    const userData = { ...req.body };

    const user = await registerUserService(userData);

    sendResponse(res, 201, "User registered", user);
  } catch (err: any) {
    sendResponse(res, 500, err.message);
  }
};

export const checkUsername = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.body;
    const available = await checkUsernameService(username as string);
    sendResponse(res, 200, "Username check", { available });
  } catch (err: any) {
    sendResponse(res, 500, err.message);
  }
};


export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, currentPassword, newPassword } = req.body;
    const result = await resetPasswordService(username, currentPassword, newPassword);

    if (!result.success) {
      sendResponse(res, result.status, result.message);
      return;
    }

    sendResponse(res, 200, "Password reset successfully");
  } catch (err: any) {
    sendResponse(res, 500, err.message);
  }
};