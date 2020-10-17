const mongoose = require('mongoose');
const { version } = require('yargs');

const contactsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      default: 'free',
      uppercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: String,
  },
  { versionKey: false },
);

class Contacts {
  constructor() {
    this.dataBase = mongoose.model('Contacts', contactsSchema);
  }

  getContacts = async () => {
    return await this.dataBase.find();
  };

  addContact = async data => {
    return await this.dataBase.create(data);
  };

  getContactById = async id => {
    return await this.dataBase.findById(id);
  };

  deleteContact = async id => {
    return await this.dataBase.findByIdAndRemove(id);
  };

  updateContact = async (id, udateData) => {
    return await this.dataBase.findByIdAndUpdate(id, udateData, { new: true });
  };

  findContactByEmail = async email => {
    return await this.dataBase.findOne({ email });
  };
}

module.exports = new Contacts();
