const Book = require("./books.model")

async function getBookMongo(filters) {
    const amountBooks = await Book.countDocuments(filters);
    const filteredBooks = await Book.find(filters);

    return {
        listBooks: filteredBooks,
        totalBooks: amountBooks
    };
};

async function createBookMongo(info) {
    const createdBook = await Book.create(info);

    return createdBook;
};

async function updateBookMongo(id, changes) {
    const updatedBook = await Book.findByIdAndUpdate(id, changes);

    return updatedBook
};

async function findBookById(bookId){
    return await Book.findById(bookId);
};

async function updateBookById(bookId, bookUpdates){
    return await Book.findByIdAndUpdate(bookId, bookUpdates, { new: true });
};


async function deleteBookMongo(id) {
    return await Book.findByIdAndUpdate(
        id,
        { enabled: false },
        { new: true }
    );
};

module.exports = {
    createBookMongo,
    getBookMongo,
    updateBookMongo,
    findBookById,
    updateBookById,
    deleteBookMongo
};