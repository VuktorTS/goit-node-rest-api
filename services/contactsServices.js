import { Contact } from "../models/Contact.js";

export const getAllContacts = () => Contact.find();
