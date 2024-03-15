import * as authServices from "../services/authServices.js";
import { controllerWraper } from "../helpers/controllerWraper.js";
import HttpError from "../helpers/HttpError.js";

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
  const token = "123.123.123";
  res.json({ token });
};

export default {
  signup: controllerWraper(signup),
  signin: controllerWraper(signin),
};
