import { Schema, model } from "mongoose";

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  faforite: {
    type: Boolean,
    default: false,
  },
});
export const Contact = model("contact", contactSchema);
