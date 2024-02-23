import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactPath = path.resolve("db", "contacts.json");

const updateContacts = (contacts) => {
  fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
};

export const listContacts = async () => {
  const contacts = await fs.readFile(contactPath);

  return JSON.parse(contacts);
};
export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);

  return contact || null;
};
export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [contact] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return contact;
};
export const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...data };

  contacts.push(newContact);
  await updateContacts(contacts);

  return newContact;
};