// services/upload.service.ts
import { v2 as cloudinary } from "cloudinary";

export const uploadImageToCloudinary = (fileBuffer:String): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image", folder: "profiles" },
      (error, result) => {
        if (error || !result) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};
