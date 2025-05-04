import express from "express";
import {
  register,
  login,
  updateUser,
  deleteUser,
  getUser,
} from "../controllers/user.controller";

import { sendEmailOtp } from "../controllers/otp.controller";

import {
  loginValidation,
  registerValidation,
   updateValidation,
} from "../validation/user.validation";
import { authenticateToken } from "../middleware/auth.token";
import { validate } from "../validation/validation";
import { sendOtpSchema } from "../validation/otp.vaidations";

const router = express.Router();

// Register new user
router.post("/register", validate(registerValidation), register);

// Login user
router.post("/login", validate(loginValidation), login);

// Update user (fixed: was incorrectly using `register`)
router.put("/update/:id", validate(updateValidation), updateUser);

// Delete user
router.delete("/delete/:id", deleteUser);

// Get user details
router.get("/detail/:id", authenticateToken, getUser);

router.post("/sendOtp", validate(sendOtpSchema), sendEmailOtp);

export default router;
