// middleware/validate.ts
import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi"; // Make sure you're using `joi`

import { sendResponse } from "../middleware/res.middleware";


export const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    if (error) {
      sendResponse(res, 400, error.details[0].message);
      return;
    }
    next();
  };
};