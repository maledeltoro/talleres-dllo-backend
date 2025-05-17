const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    bookId: { type: Number, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publisher: { type: String, required: true },
    publicationDate: { type: Date, required: true },
    reserved: { type: Boolean, default: false },
    enabled: { type: Boolean, default: true },
}, {
    timestamps: true, 
    versionKey: false 
});
  
const Book = mongoose.model('Book', bookSchema);
  
module.exports = Book;
