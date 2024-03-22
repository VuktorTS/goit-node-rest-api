import Contact from "../models/contact.js";

export const getAllContacts = (filter = {}, query = {}) =>
  Contact.find(filter, "", query);

export const getOneContact = (filter) => {
  return Contact.findOne(filter);
};

export const addContacts = (data) => Contact.create(data);

export const updateOneContact = (filter, data) =>
  Contact.findOneAndUpdate(filter, data, { new: true });

export const deleteOneContact = (filter) => Contact.findOneAndDelete(filter);
