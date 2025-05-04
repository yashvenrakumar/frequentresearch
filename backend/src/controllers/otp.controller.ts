import { Request, Response } from "express";
import { sendResponse } from "../middleware/res.middleware";
import { sendOtpService, verifyOtpService } from "../services/otp.service";

export const sendEmailOtp = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  try {
    const otp = await sendOtpService(email);
    sendResponse(res, 200, "OTP created. Please check your email.", { otp });
  } catch (error: any) {
    sendResponse(res, error.status || 500, error.message || "OTP creation failed");
  }
};

export const verifyEmailOtp = async (req: Request, res: Response): Promise<void> => {
  const { email, otp } = req.body;

  try {
    await verifyOtpService(email, otp);
    
    sendResponse(res, 200, "OTP verified successfully");
  } catch (error: any) {
    sendResponse(res, error.status || 500, error.message || "OTP verification failed");
  }
};
