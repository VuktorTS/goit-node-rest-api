import jwt from "jsonwebtoken";
import * as authServices from "../services/authServices.js";
import { controllerWraper } from "../helpers/controllerWraper.js";
import HttpError from "../helpers/HttpError.js";

const { JWT_SEKRET } = process.env;

const register = async (req, res) => {
  const { email } = req.body;
  const user = await authServices.findUser({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const newUser = await authServices.register(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: "starter",
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });

  if (!user) {
    throw HttpError(401, "Email or password no valid");
  }

  const comparePassword = await authServices.validatePassword(
    password,
    user.password
  );

  if (!comparePassword) {
    throw HttpError(401, "Email or password no valid");
  }

  const { _id: id, subscription } = user;
  const payload = {
    id,
  };
  const token = jwt.sign(payload, JWT_SEKRET, { expiresIn: "23h" });

  await authServices.updateUser({ _id: id }, { token });
  res.json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await authServices.updateUser({ _id }, { token: "" });
  res.status(204).end();
};
const updateUserSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  
  await authServices.updateUser({ _id }, { subscription });
  res.status(204).end();
};

export default {
  register: controllerWraper(register),
  login: controllerWraper(login),
  getCurrent: controllerWraper(getCurrent),
  logout: controllerWraper(logout),
  updateUserSubscription: controllerWraper(updateUserSubscription),
};
