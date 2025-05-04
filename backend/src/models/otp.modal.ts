import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user.model"; // Assuming this is the User model interface

interface IOtp extends Document {
  userId: IUser["_id"]; // Reference to User model
  otp: number;
  expireAt: Date;
}

const OtpSchema = new Schema<IOtp>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    otp: { type: Number, required: true },
    expireAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IOtp>("Otp", OtpSchema);
