const { Router } = require('express');
const contacts = require('./contacts');

const contactsRouter = Router();

contactsRouter.get('/', async (req, res) => {
  const contactList = await contacts.listContacts();
  res.status(200).json(contactList);
});

contactsRouter.get('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const contactById = await contacts.getContactById(contactId);
  if (contactById) {
    res.status(200).json(contactById);
  }
  res.status(404).json({ message: 'Not found' });
});

contactsRouter.post('/', async (req, res) => {
  const contactData = req.body;
  if (!contactData.name || !contactData.phone || !contactData.email) {
    res.status(400).json({ message: 'missing required name field' });
  }
  const contactFromDB = await contacts.addContact(contactData);
  res.status(201).json(contactFromDB);
});

contactsRouter.delete('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const isContactIdExist = await contacts.getContactById(contactId);
  if (isContactIdExist) {
    await contacts.removeContact(contactId);
    res.status(200).json({ message: 'contact deleted' });
    return;
  }

  res.status(404).json({ message: 'Not found' });
});

contactsRouter.patch('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const isContactInContacts = await contacts.getContactById(contactId);
  if (!isContactInContacts)
    return res.status(404).json({ message: 'Id not found' });
  const { name, phone, email } = req.body;
  if (name || phone || email) {
    const updateData = { name, email, phone };
    const updatedContact = await contacts.updateContact(contactId, updateData);
    res.status(200).json(updatedContact);
    return;
  }
  res.status(400).json({ message: 'missing fields' });
});

module.exports = contactsRouter;
