require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const contactsRouter = require('./api/contacts/routes');
const cors = require('cors');
const PORT = 4040;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_ADRESS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database is connected successfully');
  } catch (error) {
    console.log(error);
    return process.exit(1);
  }

  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use('/api/contacts', contactsRouter);

  app.listen(PORT, () => {
    console.log(`Server listen on PORT: ${PORT}`);
  });
};

startServer();
