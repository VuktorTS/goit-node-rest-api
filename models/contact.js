const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  faforite: Boolean,
});
export const Contact = model("contact", contactSchema);
