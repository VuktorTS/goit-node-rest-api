import User from "../models/User.js";
import bcrypt from "bcrypt";

export const findUser = (filter) => User.findOne(filter);

export const signup = async (date) => {
  const hashPassword = await bcrypt.hash(date.password, 10);
  return User.create({ ...date, password: hashPassword });
};
