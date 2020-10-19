const ContactsDB = require('./contacts.model');

const getContactsController = async (req, res, next) => {
  try {
    const contacts = await ContactsDB.getContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await ContactsDB.getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const addContactsController = async (req, res, next) => {
  try {
    const { body } = req;
    if (!body.name || !body.phone || !body.email || !body.password) {
      res.status(400).json({ message: 'missing required name field' });
    }
    const isContactExist = await ContactsDB.findContactByEmail(body.email);
    if (isContactExist) {
      return res
        .status(400)
        .json({ message: 'contact email is already in database' });
    }
    const contact = await ContactsDB.addContact(body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

const updateContactsController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;
    if (body.name || body.email || body.password || body.phone) {
      const contact = await ContactsDB.updateContact(contactId, body);
      if (!contact) {
        return res.status(404).json({ message: 'Not found' });
      }
      res.status(200).json(contact);
    }
    res.status(400).json({ message: 'missing required name field' });
  } catch (error) {
    next(error);
  }
};

const deleteContactsController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await ContactsDB.deleteContact(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContactsController,
  getContactController,
  addContactsController,
  updateContactsController,
  deleteContactsController,
};
