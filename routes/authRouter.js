import express from "express";
import authController from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { userSignupSchema, userSigninSchema } from "../schemas/userSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();
authRouter.post(
  "/signup",
  validateBody(userSignupSchema),
  authController.signup
);
authRouter.post(
  "/signin",
  validateBody(userSigninSchema),
  authController.signin
);

authRouter.get("/current", authenticate, authController.getCurrent);

export default authRouter;
