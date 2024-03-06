import { Contact } from "../models/Contact.js";

export const getAllContacts = () => Contact.find();

export const addContacts = (data) => Contact.create(data);
