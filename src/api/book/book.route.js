const express = require('express');
const { validate } = require('express-validation');
const BookController = require('./book.controller');
const { create, list } = require('./book.validator');
const { requireAuth } = require('../auth/auth.middleware');

const router = express.Router();

// router.get('/', requireAuth, validate(list, { context: true }), BookController.getListBooks);
// router.get('/:id', requireAuth, BookController.getDetailBook);
// router.post('/', requireAuth, validate(create, { context: true }), BookController.createBook);
// router.put('/:id', requireAuth, validate(create, { context: true }), BookController.updateBook);
// router.delete('/:id', requireAuth, BookController.deleteBook);

router.get('/', BookController.getListBooks);
router.post('/listid', BookController.getListBooksByListId);
router.get('/search', BookController.listBookConditon);
router.get('/count', BookController.getCountOfBookConditon);
// router.delete('/delete-empty', BookController.deleteEmtyBook);
router.post('/', BookController.createBook);
router.put('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);
router.get('/:id', BookController.getDetailBook);


module.exports = router;

