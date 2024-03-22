import Joi from "joi";
import { emailRegExp } from "../constants/user_constants.js";

export const userRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
});
