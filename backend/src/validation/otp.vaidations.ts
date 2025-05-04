import Joi from "joi";

export const sendOtpSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const verifyOtpSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.number().required(),
});
