import express from "express";
import authController from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { userSignupSchema, userSigninSchema } from "../schemas/userSchemas.js";

const authRouter = express.Router();
authRouter.post(
  "/signup",
  validateBody(userSignupSchema),
  authController.signup
);

export default authRouter;
