import Joi from "joi";

export const userProfileValidation = Joi.object({
  username: Joi.string().min(4).max(20).regex(/^\S+$/).required(),
  currentPassword: Joi.string().optional(),
  newPassword: Joi.string()
    .min(8)
    .pattern(/[!@#$%^&*]/)
    .pattern(/[0-9]/)
    .optional(),
  profession: Joi.string().valid("Student", "Developer", "Entrepreneur").required(),
  companyName: Joi.string().when("profession", {
    is: "Entrepreneur",
    then: Joi.required(),
    otherwise: Joi.optional()
  }),
  addressLine1: Joi.string().required(),
  country: Joi.string().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
  subscriptionPlan: Joi.string().valid("Basic", "Pro", "Enterprise").required(),
  newsletter: Joi.boolean().default(true),
  profilePhoto:Joi.string().optional(),
});


 
export const resetPasswordValidation = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Username is required",
  }),

  currentPassword: Joi.string().required().messages({
    "string.empty": "Current password is required",
  }),

  newPassword: Joi.string()
    .min(6)
    .pattern(/[A-Z]/, "uppercase")
    .pattern(/[0-9]/, "number")
    .pattern(/[!@#$%^&*]/, "special")
    .required()
    .messages({
      "string.empty": "New password is required",
      "string.min": "Must be at least 6 characters",
      "string.pattern.name": "New password must include an {#name} character",
    }),
});
