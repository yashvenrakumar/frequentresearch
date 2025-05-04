// utils/multerCloudinary.ts

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";

// Extending the Params type to include 'folder' and other required parameters
interface CloudinaryParams {
  folder: string;
  allowed_formats: string[];
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Cloudinary folder
    allowed_formats: ["jpg", "jpeg", "png"], // Allowed formats
  } as CloudinaryParams, // Type assertion to make sure the params are of the correct type
});

// Configure multer with the Cloudinary storage
const upload = multer({ storage });

export default upload;
