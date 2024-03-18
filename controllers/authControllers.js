import jwt from "jsonwebtoken";
import * as authServices from "../services/authServices.js";
import { controllerWraper } from "../helpers/controllerWraper.js";
import HttpError from "../helpers/HttpError.js";

const { JWT_SEKRET } = process.env;

const signup = async (req, res) => {
  const { email } = req.body;
  const user = await authServices.findUser({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const newUser = await authServices.signup(req.body);
  res.status(201).json({ username: newUser.username, email: newUser.email });
};

const signin = async (req, res) => {
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

  const { _id: id } = user;
  const payload = {
    id,
  };
  const token = jwt.sign(payload, JWT_SEKRET, { expiresIn: "23h" });

  res.json({ token });
};

const getCurrent = async (req, res) => {
  const { username, email } = req.user;
  res.json({ username, email });
};
export default {
  signup: controllerWraper(signup),
  signin: controllerWraper(signin),
  getCurrent: controllerWraper(getCurrent),
};
