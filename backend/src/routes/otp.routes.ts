import express from "express";
import { sendEmailOtp, verifyEmailOtp } from "../controllers/otp.controller";
 import { validate } from "../validation/validation";
import { sendOtpSchema, verifyOtpSchema } from "../validation/otp.vaidations";

const router = express.Router();

router.post("/sendOtp", validate(sendOtpSchema), sendEmailOtp);
router.post("/verifyOtp", validate(verifyOtpSchema), verifyEmailOtp);

export default router;
