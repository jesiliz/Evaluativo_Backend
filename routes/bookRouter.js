const express = require('express');
const booksController = require('../controllers/bookController');

const validator = require ('express-joi-validation').createValidator();

const routes = Book => {
    const bookRouter = express.Router();
    const { getBooks, postBooks, getBookById , getBookByTitle, getBookByAuthor, putBooks, deleteBookById} = booksController(Book);

    bookRouter.route('/books')
        .get(getBooks)
        .post(postBooks)

    bookRouter.route('/books/:bookId')
        .get(getBookById)
        .put(putBooks)
        .delete(deleteBookById);  

    bookRouter.route('/books/:bookTitle')
        .get(getBookByTitle)
        
    bookRouter.route('/books/:bookAuthor')
        .get(getBookByAuthor)

    return bookRouter;
}
module.exports = routes;