import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateRefreshToken, generateToken } from "../utils/jwt.util";
import { sendResponse } from "../middleware/res.middleware";

export const registerUser = async (name: string, email: string, password: string) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = await User.create({ name, email, password: hashedPassword });


   // Generate tokens
  const accessToken = generateToken({ id: user.id, name: user.name });
 
  const refreshToken = generateRefreshToken({ id: user.id, name: user.name });

 return { user, accessToken, refreshToken };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) throw new Error("Invalid credentials");
  const accessToken = generateToken({ id: user.id, name: user.name });
 
  const refreshToken = generateRefreshToken({ id: user.id, name: user.name });

  return { user,accessToken, refreshToken };
};



export const updateUserService = async (id: string, updateData: object) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteUserService = async (id: string) => {
  return await User.findByIdAndDelete(id);
};

export const getUserService = async (id: string) => {
  const user = await User.findById(id).select("-password"); // Exclude password for security
  return user || null;
};