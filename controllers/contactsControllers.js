import HttpError from "../helpers/HttpError.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getContactById(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400);
    }
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    console.log(updateContactSchema.validate(req.body));
    if (error) {
      throw HttpError(400);
    }
    const { id } = req.params;
    const result = await updateContactById(id, req.body);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res) => {};
