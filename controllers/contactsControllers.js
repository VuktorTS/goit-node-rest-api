import HttpError from "../helpers/HttpError.js";
import { controllerWraper } from "../helpers/controllerWraper.js";
import * as contactServices from "../services/contactsServices.js";
const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const filter = { owner };
  if (favorite) {
    filter.favorite = favorite;
  }

  const result = await contactServices.getAllContacts(filter, { skip, limit });
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id: _id } = req.params;
  const { id: owner } = req.user;
  const result = await contactServices.getOneContact({ _id, owner });
  if (!result) {
    throw HttpError(404, `Contact with id=${_id} not found`);
  }
  res.json(result);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await contactServices.addContacts({ ...req.body, owner });

  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id: _id } = req.params;
  const { id: owner } = req.user;
  const result = await contactServices.updateOneContact(
    { _id, owner },
    req.body
  );

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id: _id } = req.params;
  const { id: owner } = req.user;
  const result = await contactServices.deleteOneContact({ _id, owner });

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id: _id } = req.params;
  const { id: owner } = req.user;
  const result = await contactServices.updateOneContact(
    { _id, owner },
    req.body
  );

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export default {
  getAll: controllerWraper(getAll),
  getOneContact: controllerWraper(getOneContact),
  createContact: controllerWraper(createContact),
  updateContact: controllerWraper(updateContact),
  deleteContact: controllerWraper(deleteContact),
  updateStatusContact: controllerWraper(updateStatusContact),
};
