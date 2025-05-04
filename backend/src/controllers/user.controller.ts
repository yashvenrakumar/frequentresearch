import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  updateUserService,
  deleteUserService,
  getUserService,
} from "../services/user.service"; 
import { sendResponse } from "../middleware/res.middleware";

// Optionally define request body types for better type safety
interface AuthRequestBody {
  name?: string;
  email: string;
  password: string;
}

interface UpdateUserRequestBody {
  name?: string;
  email?: string;
  password?: string;
}

// Register
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
  
    const { user, accessToken, refreshToken } = await registerUser(
      req.body.name,
      req.body.email,
      req.body.password
    );

    sendResponse(res, 201, "User registered successfully", {
      user,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unknown error occurred";
    sendResponse(res, 400, message); // ✅ OK
  }
};

// Login
export const login = async (
  req: Request<{}, {}, AuthRequestBody>,
  res: Response
): Promise<void> => {
  try {
    
    const { user, accessToken, refreshToken } = await loginUser(
      req.body.email,
      req.body.password
    );

    sendResponse(res, 200, "Login successful", {
      user,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid credentials";
    sendResponse(res, 401, message);
  }
};

// Update User
export const updateUser = async (
  req: Request<{ id: string }, {}, UpdateUserRequestBody>,
  res: Response
): Promise<void> => {
  try {
   
    const updatedUser = await updateUserService(req.params.id, req.body);
    if (!updatedUser) sendResponse(res, 404, "User not found");

    sendResponse(res, 200, "User updated successfully", updatedUser);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unknown error occurred";
    sendResponse(res, 500, message);
  }
};

// Delete User
export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const deleted = await deleteUserService(req.params.id);
    if (!deleted) sendResponse(res, 404, "User not found");

    sendResponse(res, 200, "User deleted successfully");
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unknown error occurred";
    sendResponse(res, 500, message);
  }
};

// Get User
export const getUser = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const userDetails = await getUserService(req.params.id);
    if (!userDetails) sendResponse(res, 404, "User not found");

    sendResponse(res, 200, "User retrieved successfully", userDetails);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unknown error occurred";
    sendResponse(res, 500, message);
  }
};


 