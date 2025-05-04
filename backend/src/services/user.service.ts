import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateRefreshToken, generateToken } from "../utils/jwt.util";

export const registerUserService = async (data: any) => {
  const { password, newPassword, currentPassword, ...rest } = data;
  let finalPassword = password;

  if (currentPassword && newPassword) {
    finalPassword = await bcrypt.hash(newPassword, 10);
  }

  const user = await User.create({ ...rest, password: finalPassword });
  const accessToken = generateToken({ id: user.password.toString(), name: user.username });
  const refreshToken = generateRefreshToken({ id: user.password.toString(), name: user.username });

  return { user, accessToken, refreshToken };
 };

export const checkUsernameService = async (username: string) => {
  const user = await User.findOne({ username });
  return !user;
};


export const resetPasswordService = async (
  username: string,
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; message: string; status: number }> => {
  const user = await User.findOne({ username });
  if (!user) {
    return { success: false, status: 404, message: "User not found" };
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return { success: false, status: 401, message: "Current password is incorrect" };
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedNewPassword;
  await user.save();

  return { success: true, status: 200, message: "Password reset successfully" };
};