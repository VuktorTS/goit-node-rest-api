import HttpError from "../helpers/HttpError.js";
import { controllerWraper } from "../helpers/controllerWraper.js";
import {
  addContacts,
  deleteContactById,
  getAllContacts,
  getContactById,
  updateContactById,
  updateStatusContactById,
} from "../services/contactsServices.js";
const getAll = async (_, res) => {
  const result = await getAllContacts();
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.status(200).json(result);
};

const createContact = async (req, res) => {
  const result = await addContacts(req.body);
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
  const result = await deleteContactById(id);
  console.log("result: ", result);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await updateStatusContactById(id, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

export default {
  getAll: controllerWraper(getAll),
  getOneContact: controllerWraper(getOneContact),
  createContact: controllerWraper(createContact),
  updateContact: controllerWraper(updateContact),
  deleteContact: controllerWraper(deleteContact),
  updateStatusContact: controllerWraper(updateStatusContact),
};
