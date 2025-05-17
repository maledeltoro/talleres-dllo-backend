const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    reservationDate: { type: Date, default: Date.now, },
    deliveryDate: { type: Date, default: Date.now, },
}, {
    timestamps: true, versionKey: false
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
