const BookBiz = require('../../biz/book/book.biz');
const BookTransform = require('./book.transform');

exports.createBook = async (req, res, next) => {
    const book = req.body;
    try {
        const result = await BookBiz.createBook(book);
        res.sendJSON(result);
    } catch (error) {
        next(error)
    }
}

exports.getDetailBook = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await BookBiz.getDetailBook(id);
        res.sendJSON(BookTransform.toDetailResponse(result));
    } catch (error) {
        next(error);
    }
};

exports.getListBooks = async (req, res, next) => {
    const { skip, limit } = req.query;
    try {
        const result = await BookBiz.getListBooks(Number(skip) || 0, Number(limit) || 25);
        res.sendJSON(BookTransform.toListResponse(result));
    } catch (error) {
        next(error)
    }
}


exports.getListBooksByListId = async (req, res, next) => {
    const { skip, limit } = req.query;
    const listIds = req.body;
    console.log('listIds', listIds);
    try {
        const result = await BookBiz.getListBooksbyListIds(Number(skip) || 0, Number(limit) || 25, listIds);
        res.sendJSON(BookTransform.toListResponse(result));
    } catch (error) {
        next(error)
    }
}


exports.listBookConditon = async (req, res, next) => {
    const condition = req.query;
    const skip = Number(condition['skip'])
    const limit = Number(condition['limit'])
    console.log(condition);
    delete condition['skip'];
    delete condition['limit'];
    const ObjQuery = {}

    for (const prop in condition) {
        ObjQuery[prop] = { $regex: condition[prop], $options: 'i' }
    }

    try {
        const result = await BookBiz.getListBookByCondition(ObjQuery, skip, limit);
        res.sendJSON(BookTransform.toListResponse(result));
    } catch (error) {
        next(error);
    }
}

exports.getCountOfBookConditon = async (req, res, next) => {
    const condition = req.query;
    const skip = Number(condition['skip'])
    const limit = Number(condition['limit'])
    console.log(condition);
    delete condition['skip'];
    delete condition['limit'];
    const ObjQuery = {}

    for (const prop in condition) {
        ObjQuery[prop] = { $regex: condition[prop], $options: 'i' }
    }

    try {
        const result = await BookBiz.getListBookByCondition(ObjQuery, skip, limit);
        const count = result.length;
        res.sendJSON(count);
    } catch (error) {
        next(error);
    }
}

// exports.deleteEmtyBook = async (req, res, next) => {
//     const condition = req.query;
//     const skip = Number(condition['skip'])
//     const limit = Number(condition['limit'])
//     console.log(condition);
//     delete condition['skip'];
//     delete condition['limit'];
//     const ObjQuery = {}

//     for (const prop in condition) {
//         ObjQuery[prop] = { $regex: condition[prop], $options: 'i' }
//     }

//     try {
//         const result = await BookBiz.getListBookByCondition(ObjQuery, skip, limit);
//         const listBookEmpty = result;
//         const listBookIdEmpty = listBookEmpty.map(bookEmpty => {
//             return bookEmpty._id
//         })

//         const getWithPromiseAll = async () => {
//             console.time("promise all");
//             let data = await Promise.all(listBookIdEmpty.map(async (id) => {
//                 return await BookBiz.deleteBook(id);
//             }))
//             console.timeEnd('data', data);
//         }
//         getWithPromiseAll();

//         console.log(listBookIdEmpty);
//         res.sendJSON(listBookIdEmpty);
//     } catch (error) {
//         next(error);
//     }
// }




exports.updateBook = async (req, res, next) => {
    const { id } = req.params;
    const book = req.body;
    try {
        const result = await BookBiz.updateBook(id, book);
        res.sendJSON(result);
    } catch (error) {
        next(error);
    }
};

exports.deleteBook = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await BookBiz.deleteBook(id);
        res.sendJSON(result);
    } catch (error) {
        next(error);
    }
};
