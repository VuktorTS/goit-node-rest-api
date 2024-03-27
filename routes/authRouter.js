import express from "express";
import authController from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { userRegisterSchema, userLoginSchema } from "../schemas/userSchemas.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();
authRouter.patch("/", authenticate, authController.updateUserSubscription);

authRouter.post(
  "/register",
  validateBody(userRegisterSchema),
  authController.register
);

authRouter.post("/login", validateBody(userLoginSchema), authController.login);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);
authRouter.patch(
  "/avatars",
  upload.single("avatars"),
  authenticate,
  authController.avatars
);

export default authRouter;
