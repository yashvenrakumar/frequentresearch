import User from "../models/user.model";
import Otp from "../models/otp.modal";
import { sendMail } from "../utils/user.mailer";
import { otpVerifiedTemplate, sendOtpTempletes } from "../config/email.templetes";

export const sendOtpService = async (email: string): Promise<number> => {
  const user = await User.findOne({ email });
  if (!user) {
    const err: any = new Error("User not found");
    err.status = 404;
    throw err;
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const expireAt = new Date(Date.now() + 60 * 1000); // 1 minute expiry

  const existingOtpEntry = await Otp.findOne({ userId: user._id });

  if (existingOtpEntry) {
    existingOtpEntry.otp = otp;
    existingOtpEntry.expireAt = expireAt;
    await existingOtpEntry.save();
  } else {
    const newOtp = new Otp({
      userId: user._id,
      otp,
      expireAt,
    });
    await newOtp.save();
  }

  const messageTemplate = sendOtpTempletes(otp.toString());
  await sendMail(email, "OTP Verification Code", messageTemplate);

  return otp;
};

export const verifyOtpService = async (email: string, otp: string | number): Promise<void> => {
  const user = await User.findOne({ email });
  if (!user) {
    const err: any = new Error("User not found");
    err.status = 404;
    throw err;
  }

  const otpEntry = await Otp.findOne({ userId: user._id });
  if (!otpEntry) {
    const err: any = new Error("OTP not found. Please request a new one.");
    err.status = 404;
    throw err;
  }

  const isExpired = new Date() > otpEntry.expireAt;
  if (isExpired) {
    await Otp.deleteOne({ _id: otpEntry._id });
    const err: any = new Error("OTP has expired. Please request a new one.");
    err.status = 410;
    throw err;
  }

  if (otpEntry.otp.toString() !== otp.toString()) {
    const err: any = new Error("Invalid OTP");
    err.status = 401;
    throw err;
  }

  const messageTemplate = otpVerifiedTemplate();
  await sendMail(email, "OTP Successfully verified", messageTemplate);

  // OTP is valid, remove it
  await Otp.deleteOne({ _id: otpEntry._id });
};
