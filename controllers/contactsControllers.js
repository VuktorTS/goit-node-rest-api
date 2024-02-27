import HttpError from "../helpers/HttpError.js";
import { controllerWraper } from "../helpers/controllerWraper.js";
import {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContact,
} from "../services/contactsServices.js";

const getAllContacts = async (req, res) => {
  const result = await listContacts();
  res.status(200).json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

const createContact = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await updateContactById(id, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);
  console.log("result: ", result);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};
export default {
  getAllContacts: controllerWraper(getAllContacts),
  getOneContact: controllerWraper(getOneContact),
  createContact: controllerWraper(createContact),
  updateContact: controllerWraper(updateContact),
  deleteContact: controllerWraper(deleteContact),
};
