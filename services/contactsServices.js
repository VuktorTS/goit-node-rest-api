import Contact from "../models/contact.js";

export const getAllContacts = () => Contact.find();

export const getContactById = (id) => Contact.findById(id);

export const addContacts = (data) => Contact.create(data);

export const updateContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data);

export const deleteContactById = (id) => Contact.findByIdAndDelete(id);

export const updateStatusContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data);
