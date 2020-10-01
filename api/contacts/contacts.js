const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.resolve(__dirname, '..', '..', 'db', 'contacts.json');

const getContacts = async () => {
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
  const contactById = contacts.find(({ id }) => id === Number(contactId));
  return contactById;
}

async function removeContact(contactId) {
  const contacts = await getContacts();
  const updatedContacts = contacts.filter(({ id }) => id !== Number(contactId));
  const updatedContactsJSON = JSON.stringify(updatedContacts);
  await fs.writeFile(contactsPath, updatedContactsJSON);
  return updatedContacts;
}

async function addContact({ name, email, phone }) {
  const contacts = await getContacts();
  const contactId = contacts.length ? [...contacts].pop().id + 1 : 1;
  const newContact = { id: contactId, name, email, phone };
  contacts.push(newContact);
  const updatedContactsJson = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, updatedContactsJson);
  return newContact;
}

async function updateContact(contactId, updateData) {
  const contacts = await getContacts();
  const updateForContact = Object.keys(updateData).reduce(
    (acc, item) =>
      updateData[item] ? { ...acc, [item]: updateData[item] } : { ...acc },
    {},
  );
  const updatedContacts = contacts.map(contact => {
    if (contact.id === Number(contactId)) {
      return { ...contact, ...updateForContact };
    }
    return contact;
  });
  const updatedContactsJson = JSON.stringify(updatedContacts);
  await fs.writeFile(contactsPath, updatedContactsJson);
  const updatedContact = updatedContacts.find(
    ({ id }) => id === Number(contactId),
  );
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
