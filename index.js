const contacts = require('./contacts');
const argv = require('yargs').argv;
const http = require('http');
const PORT = 4040;

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

// invokeAction(argv);

const parseBody = request => {
  return new Promise((resolve, reject) => {
    let body = [];
    request
      .on('data', chunk => {
        body.push(chunk);
      })
      .on('end', () => {
        resolve(JSON.parse(body.toString()));
      })
      .on('eror', err => {
        reject(err);
      });
  });
};

const serializer = query => {
  const queries = query.split('&');
  return queries.reduce((obj, itm) => {
    const [key, value] = itm.split('=');
    return { ...obj, [key]: value.split('%20').join(' ') };
  }, {});
};

const server = http.createServer(async (req, res) => {
  const { url, method } = req;
  const [path, query] = url.split('?');
  switch (path) {
    case '/contacts':
      switch (method) {
        case 'GET':
          const contactList = await contacts.listContacts();
          const stringifiedContacts = JSON.stringify(contactList);
          res.setHeader('Content-Type', 'application/json');
          res.write(stringifiedContacts);
          res.end();
          break;
        case 'POST':
          const body = await parseBody(req);
          console.log(body);
          const newContact = await contacts.addContact(body);
          const stringifiedContact = JSON.stringify(newContact);
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 201;
          res.write(stringifiedContact);
          res.end();
          break;
        case 'DELETE':
          const id = Number(serializer(query).id);
          if (id) {
            await contacts.removeContact(id);
          }
          res.end();
          break;
        default:
          res.write('bad query');
          res.end();
          break;
      }
      break;

    default:
      res.write('<h1>Hello</h1>');
      res.end();
      break;
  }
});

server.listen(PORT, err => {
  if (err) return console.log(err);
  console.log(`Server listening on PORT: ${PORT}`);
});
