const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.resolve(__dirname, 'db', 'contacts.json');

const getContacts = async () => {
  console.log(contactsPath);
  const contacts = await fs.readFile(contactsPath, {
    encoding: 'utf-8',
  });
  return JSON.parse(contacts);
};

async function listContacts() {
  const result = await getContacts();
  return result;
}

async function getContactById(contactId) {
  const contacts = await getContacts();
  const contactById = contacts.find(({ id }) => id === contactId);
  return contactById;
}

async function removeContact(contactId) {
  const contacts = await getContacts();
  const updatedContacts = contacts.filter(({ id }) => id !== contactId);
  const updatedContactsJSON = JSON.stringify(updatedContacts);
  fs.writeFile(contactsPath, updatedContactsJSON);
  return updatedContacts;
}

async function addContact(name, email, phone) {
  const contacts = await getContacts();
  const contactId = contacts.length ? [...contacts].pop().id + 1 : 1;
  const newContact = { id: contactId, name, email, phone };
  contacts.push(newContact);
  const updatedContactsJson = JSON.stringify(contacts);
  fs.writeFile(contactsPath, updatedContactsJson);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
