const { throwCustomError } = require("../utils/functions");
const { createBookMongo, getBookMongo, deleteBookMongo,findBookById, updateBookById } = require("./books.actions");
const Book = require("./books.model");
const mongoose = require('mongoose');
const { createReservation } = require("../reservations/reservation.action");


async function readBookConFiltros(params, query) {
    const { bookId } = params;

    const { title, author, genre, publisher, publicationDate, reserved, enabled } = query;

    if (bookId) {
        const { enabled } = query;
        const enabledStatus = enabled === 'false' ? false : true;
    
        const book = await getBookMongo({ _id: bookId, enabled: enabledStatus });
        
        return book ? [book] : [];
    }
    

    const queryMongo = {
        ...(title && { title: { $regex: title, $options: "i" } }),
        ...(author && { author: { $regex: author, $options: "i" } }),
        ...(genre && { genre }),
        ...(publisher && { publisher: { $regex: publisher, $options: "i" } }),
        ...(publicationDate && { publicationDate: { $gte: new Date(publicationDate) } }),
        ...(reserved && { reserved: reserved === 'true' }),
        ...(enabled !== undefined ? { enabled: enabled === 'true' } : { enabled: true })
    };

    const resultBook = await getBookMongo(queryMongo);
    return resultBook;
};

async function createBook(info) {
    const createdBook = await createBookMongo(info);

    return createdBook;
};



const updateBook = async (req, res) => {

    const bookId = req.params.bookId;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ message: "bookId no válido" });
    }

    const userId = req.userId;  
    const bookUpdates = req.body;  

    try {
        const bookObjectId = mongoose.Types.ObjectId.isValid(bookId) ? new mongoose.Types.ObjectId(bookId) : bookId;
        const userObjectId = mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : userId;

        const book = await findBookById(bookObjectId);

        if (!book) {
            return res.status(404).json({ message: "Libro no encontrado" });
        }



        if (bookUpdates.hasOwnProperty('reserved') && bookUpdates.reserved === true && book.reserved === false) {
            const reservationDate = new Date();
            const deliveryDate = new Date();
            deliveryDate.setDate(reservationDate.getDate() + 15);

            await createReservation({
                userId: userObjectId,
                bookId: bookObjectId,
                reservationDate: reservationDate,
                deliveryDate: deliveryDate
            });
        }

        const updatedBook = await updateBookById(bookObjectId, bookUpdates);

        res.json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error de servidor" });
    }
};




async function deleteBookHandler(req, res) {
    const { id } = req.params;  
    const userId = req.userId;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        const softDeleteBook = await deleteBookMongo(id);
        return res.status(200).json({ message: 'Libro eliminado exitosamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al realizar soft delete del libro', error: error.message });
    }
};

module.exports = {
    readBookConFiltros,
    createBook,
    updateBook,
    deleteBookHandler
}