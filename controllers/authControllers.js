import jwt from "jsonwebtoken";
import * as authServices from "../services/authServices.js";
import { controllerWraper } from "../helpers/controllerWraper.js";
import HttpError from "../helpers/HttpError.js";
import gravatar from "gravatar";
import Jimp from "jimp";
import path from "path";
import fs from "fs/promises";

const { JWT_SEKRET } = process.env;
const avatarPath = path.resolve("public", "avatars");

const register = async (req, res) => {
  const { email } = req.body;
  const avatarURL = gravatar.url(email);
  const user = await authServices.findUser({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const newUser = await authServices.register({ ...req.body, avatarURL });
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
const avatars = async (req, res) => {
  const { _id } = req.user;

  if (!req.file) {
    throw HttpError(400, "Avatar not found");
  }
  const {path: oldPath, filename} = req.file;
  const newPath = path.join(avatarPath, filename);

  const image = await Jimp.read(oldPath);
  await image.resize(250, 250).writeAsync(oldPath);

  await fs.rename(oldPath, newPath);

  const avatarURL = path.join("avatars", filename);
  const user = await authServices.updateUser({ _id }, { avatarURL });

  res.json({
    avatarURL,
  });
};
export default {
  register: controllerWraper(register),
  login: controllerWraper(login),
  getCurrent: controllerWraper(getCurrent),
  logout: controllerWraper(logout),
  updateUserSubscription: controllerWraper(updateUserSubscription),
  avatars: controllerWraper(avatars),
};
