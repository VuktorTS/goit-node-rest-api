import HttpError from "../helpers/HttpError.js";
import { controllerWraper } from "../helpers/controllerWraper.js";
import * as contactServices from "../services/contactsServices.js";
const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await contactServices.getAllContacts({ owner });
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactServices.getContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.status(200).json(result);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await contactServices.addContacts({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactServices.updateContactById(id, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactServices.deleteContactById(id);
  console.log("result: ", result);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactServices.updateStatusContactById(id, req.body);
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
