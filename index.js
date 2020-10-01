const argv = require('yargs').argv;
const express = require('express');
const contacts = require('./api/contacts/contacts');
const contactsRouter = require('./api/contacts/routes');
const cors = require('cors');
const PORT = 4040;
const app = express();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contacts.listContacts().then(data => console.table(data));
      break;

    case 'get':
      contacts.getContactById(id).then(contact => console.table(contact));
      break;

    case 'add':
      contacts
        .addContact({ name, email, phone })
        .then(contact => console.table(contact));
      break;

    case 'remove':
      contacts.removeContact(id).then(data => console.table(data));
      break;

    case 'update':
      contacts
        .updateContact(id, { name, email, phone })
        .then(data => console.table(data));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

app.use(cors());

app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.listen(PORT, () => {
  console.log(`Server listen on PORT: ${PORT}`);
});
