import Joi = require("joi");
import { emailRegExp } from "../constants/user_constants";

export const userSignupSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().pattern(emailRegExp).required(),
    password: Joi.string().min(6).required(),
})

export const userSigninSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().pattern(emailRegExp).required(),
    password: Joi.string().min(6).required(),
})