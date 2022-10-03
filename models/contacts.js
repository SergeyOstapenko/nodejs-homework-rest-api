const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const filteredContact = contacts.find(({ id }) => id === contactId);

  return filteredContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((el) => el.id === String(contactId));
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const ids = contacts.map((item) => +item.id);
  const contact = { id: String(Math.max(...ids) + 1), name, email, phone };

  contacts.push(contact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const contact = await getContactById(contactId);
  const updetedContact = { ...contact, ...body };

  const index = contacts.findIndex((el) => el.id === String(contactId));
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1, updetedContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return updetedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
