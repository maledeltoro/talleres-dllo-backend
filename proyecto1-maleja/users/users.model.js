const mongoose = require('mongoose');
const { createBook } = require('../book/books.controller');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enabled: { type: Boolean, default: true },
  createBook: { type: Boolean },
  editBook: { type: Boolean },
  deleteBook: { type: Boolean },
  editUser: { type: Boolean },
  deleteUser: { type: Boolean }

});

const User = mongoose.model('User', userSchema);

module.exports = User;