import { Router } from "express";
 import { validate } from "../validation/validation";
import { resetPasswordValidation, userProfileValidation } from "../validation/user.validation";
import { registerUser, checkUsername, resetPassword } from "../controllers/user.controller";
 import uploadMiddleware from "../config/multer";
import { uploadImageController } from "../controllers/upload.controller";
 
const router = Router();

router.post(
  "/register",
  validate(userProfileValidation),
  registerUser
);
router.post("/check-username", checkUsername);
router.post("/reset-password", validate(resetPasswordValidation), resetPassword);
router.post("/upload", uploadMiddleware.single("image"),uploadImageController);

export default router;
 
