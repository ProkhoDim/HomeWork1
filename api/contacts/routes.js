const { Router } = require('express');
const {
  getContactsController,
  getContactController,
  addContactsController,
  updateContactsController,
  deleteContactsController,
} = require('./contacts.controller');

const contactsRouter = Router();

contactsRouter.get('/', getContactsController);

contactsRouter.get('/:contactId', getContactController);

contactsRouter.post('/', addContactsController);

contactsRouter.patch('/:contactId', updateContactsController);

contactsRouter.delete('/:contactId', deleteContactsController);

module.exports = contactsRouter;
