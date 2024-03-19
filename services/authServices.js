import User from "../models/User.js";
import bcrypt from "bcrypt";

export const findUser = (filter) => User.findOne(filter);

export const register = async (date) => {
  const hashPassword = await bcrypt.hash(date.password, 10);
  return User.create({ ...date, password: hashPassword });
};

export const validatePassword = (password, hashPassword) =>
  bcrypt.compare(password, hashPassword);

export const updateUser = async (filter, data) =>
  User.findOneAndUpdate(filter, data);
