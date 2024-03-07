import express from "express";
import ctrl from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import isValidId from "../middlewares/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAll);

contactsRouter.get("/:id", isValidId, ctrl.getOneContact);

contactsRouter.post("/", validateBody(createContactSchema), ctrl.createContact);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(updateContactSchema),
  ctrl.updateContact
);

// contactsRouter.delete("/:id", isValidId, ctrl.deleteContact);

export default contactsRouter;
