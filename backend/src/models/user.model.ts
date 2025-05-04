import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  profilePhoto: string;
  username: string;
  password: string;
  profession: string;
  companyName?: string;
  addressLine1: string;
  country: string;
  state: string;
  city: string;
  subscriptionPlan: string;
  newsletter: boolean;
}

const userSchema = new mongoose.Schema<IUser>({
  profilePhoto: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profession: { type: String, required: true },
  companyName: { type: String },
  addressLine1: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  subscriptionPlan: { type: String, required: true },
  newsletter: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model<IUser>("User", userSchema);
