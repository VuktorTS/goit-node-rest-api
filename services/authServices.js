import User from "../models/User.js";

export const signup = (date) => User.create(date);
