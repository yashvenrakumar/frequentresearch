// controllers/upload.controller.ts
import { Request, Response } from "express";
import { uploadImageToCloudinary } from "../services/upload.service";
import { sendResponse } from "../middleware/res.middleware";

export const uploadImageController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const file = req.file;
    if (!file) {
      sendResponse(res, 400, "No file uploaded");
    }

    sendResponse(res, 200, "Image uploaded successfully", file?.path);
  } catch (err: any) {
    sendResponse(res, 500, err.message || "Image upload failed");
  }
};
