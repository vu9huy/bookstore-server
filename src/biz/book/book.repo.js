const Book = require('./Book');

exports.createBook = async (book) => await Book.create(book);

exports.findAllBooks = async (skip, limit) => await Book.find().skip(skip).limit(limit).lean();

exports.findBooksByListIds = async (skip, limit, listIds) => await Book.find({ _id: { $in: listIds } }).skip(skip).limit(limit).lean();

exports.findBookByCondition = async (ObjQuery, skip, limit) => Book.find(ObjQuery).skip(skip).limit(limit).exec();

exports.findOneBookById = async (id) => await Book.findById(id).lean();

exports.updateOneBookbyId = async (id, book) => await Book.findByIdAndUpdate(id, book);

exports.deleteOneBookById = async (id) => await Book.findByIdAndDelete(id);

