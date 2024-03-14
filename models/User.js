import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks";
import { emailRegExp } from "../constants/user_constants";

const userShema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: emailRegExp,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userShema.post("save", handleSaveError);
userShema.pre("findOneAndUpdate", setUpdateSettings);
userShema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userShema);

export default User;
