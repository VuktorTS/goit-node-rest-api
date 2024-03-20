import Joi from "joi";
import { phoneRegExp } from "../constants/user_constants.js";

export const createContactSchema = Joi.object({
  name: Joi.string().required().empty().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().empty().required().email().messages({
    "string.email": "wrong email format",
    "any.required": "missing required email field",
  }),
  phone: Joi.string().empty().required().pattern(phoneRegExp).messages({
    "string.pattern.base":
      "wrong phone format. the phone number must be in the format (000) 000-0000",
    "any.required": "missing required phone field",
  }),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().empty(),
  email: Joi.string()
    .empty()
    .email()
    .messages({ "string.email": "wrong email format" }),
  phone: Joi.string().empty().pattern(phoneRegExp).messages({
    "string.pattern.base":
      "wrong phone format. the phone number must be in the format (000) 000-0000",
  }),
  favorite: Joi.boolean(),
})
  .min(1)
  .messages({
    "object.min": "Body must have at least {{#limit}} field",
  });
export const updateContactStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
