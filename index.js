const contacts = require('./contacts');
const argv = require('yargs').argv;

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
        .addContact(name, email, phone)
        .then(contact => console.table(contact));
      break;

    case 'remove':
      contacts.removeContact(id).then(data => console.table(data));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
/*
{
    "id": 9,
    "name": "Thomas Lucas",
    "email": "nec@Nulla.com",
    "phone": "(704) 398-7993"
  }
{
    "id": 10,
    "name": "Alec Howard",
    "email": "Donec.elementum@scelerisquescelerisquedui.net",
    "phone": "(748) 206-2688"
  }
]
*/
