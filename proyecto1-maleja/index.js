const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const userRoutes = require('./users/users.route');
const bookRoutes = require('./book/books.route');
const reservationRoutes = require('./reservations/reservation.route');
require('dotenv').config();
const authRoutes = require("./auth/auth.route");



app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/reservations', reservationRoutes);

const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mongoprueba.c8it32j.mongodb.net/?retryWrites=true&w=majority&appName=Mongoprueba`;


mongoose.connect(connectionString);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
