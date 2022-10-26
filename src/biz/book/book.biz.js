const { createBook, findAllBooks, findOneBookById, updateOneBookbyId, deleteOneBookById, findBookByCondition, findBooksByListIds, getCountOfBookByCondition } = require('./book.repo');
const { SUCCESS } = require('../../common/response.message');

exports.createBook = async (book) => {
    await createBook(book);
    return SUCCESS;
}

exports.getDetailBook = async (id) => {
    const book = await findOneBookById(id);
    if (!book) throw NotFound;
    return book;
}

exports.getListBooks = async (skip, limit) => {
    const list = await findAllBooks(skip, limit);
    return list;
}


exports.getListBooksbyListIds = async (skip, limit, listIds) => {
    const list = await findBooksByListIds(skip, limit, listIds);
    return list;
}


exports.getListBookByCondition = async (ObjQuery, skip, limit) => {
    const list = await findBookByCondition(ObjQuery, skip, limit);
    return list;
}



exports.updateBook = async (id, book) => {
    const result = await updateOneBookbyId(id, book);
    if (result.nModified === 0) throw UpdateFail;
    return SUCCESS;
}

exports.deleteBook = async (id) => {
    const result = await deleteOneBookById(id);
    if (result.deletedCount === 0) throw DeleteFail;
    return SUCCESS;
};


