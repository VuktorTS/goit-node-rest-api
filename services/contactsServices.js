import Contact from "../models/Contact.js";

export const getAllContacts = () => Contact.find();

export const getContactById = (id) => Contact.findById(id);

export const addContacts = (data) => Contact.create(data);

export const updateContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data, { new: true });
