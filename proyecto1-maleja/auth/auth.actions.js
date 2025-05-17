const jwt = require('jsonwebtoken');
const User = require('../users/users.model');
const { SECRET } = require("../config");

const register = async (name, email, hashedPassword, enabled, createBook, editBook, deleteBook, editUser, deleteUser) => {
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { error: 'El correo está registrado' };
  }

  try {
    
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      enabled: enabled !== undefined ? enabled : true,
      createBook: createBook !== undefined ? createBook : false,
      editBook: editBook !== undefined ? editBook : false,
      deleteBook: deleteBook !== undefined ? deleteBook : false,
      editUser: editUser !== undefined ? editUser : false,
      deleteUser: deleteUser !== undefined ? deleteUser : false
    });
    await newUser.save();
    return { message: 'Usuario registrado' };
  } catch (error) {
    console.error(error);
    return { error: 'Error del servidor al registrar' };
  }
};

const login = async (user) => {
  try {
    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
    return { token };
  } catch (error) {
    console.error(error);
    return { error: 'Error del servidor al generar el token' };
  }
};

module.exports = { register, login };