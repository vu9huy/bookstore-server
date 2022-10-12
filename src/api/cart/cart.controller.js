const UserBiz = require('../../biz/user/User.biz');
const { decode } = require('../../common/jwt');
const CartTransform = require('./cart.transform');
// const 

exports.getCart = async (req, res, next) => {
    const token = req.headers.authorization;
    const payload = decode(token);
    const { username } = payload;
    try {
        const userData = await UserBiz.getUserByUsername(username);
        const cart = userData.cart;
        res.sendJSON(cart);
    } catch (error) {
        next(error)
    }
}


exports.addBookToCart = async (req, res, next) => {
    const bookCart = req.body;
    const { bookId } = bookCart;
    console.log(bookCart);
    const token = req.headers.authorization;
    try {
        const payload = decode(token);
        const { username } = payload;
        const userData = await UserBiz.getUserByUsername(username);
        const cart = userData.cart;
        const cartExist = cart.filter(book => book.bookId == bookId);
        if (cartExist.length == 0) {
            cart.unshift(bookCart)
            const newUser = { ...userData, cart: cart }
            const result = await UserBiz.updateUserByUsername(username, newUser);
            res.sendJSON(result);
            return
        }
        const indexExist = cart.indexOf(cartExist[0]);
        cart[indexExist] = bookCart;
        // checkCartExist.push(bookCart);

        const newUser = { ...userData, cart: cart }
        // console.log('newUser', newUser);
        const result = await UserBiz.updateUserByUsername(username, newUser);
        res.sendJSON(result);
    } catch (error) {
        next(error)
    }
}


exports.removeBookToCart = async (req, res, next) => {
    const bookCart = req.body;
    const { bookId } = bookCart;
    console.log(bookCart);
    const token = req.headers.authorization;
    try {
        const payload = decode(token);
        const { username } = payload;
        const userData = await UserBiz.getUserByUsername(username);
        const cart = userData.cart;
        const checkCartExist = cart.filter(book => book.bookId != bookId)
        if (checkCartExist.length == cart.length) {
            return {
                error_code: 0,
                message: "Can not find book",
                data: "SUCCESS"
            }
        }
        const newUser = { ...userData, cart: checkCartExist }
        // console.log('newUser', newUser);
        const result = await UserBiz.updateUserByUsername(username, newUser);
        res.sendJSON(result);
    } catch (error) {
        next(error)
    }
}


// exports.addBookToCart = async (req, res, next) => {
//     const bookCart = req.body;
//     const { bookId } = bookCart;
//     console.log(bookCart);
//     const token = req.headers.authorization;
//     try {
//         const payload = decode(token);
//         const { username } = payload;
//         const userData = await UserBiz.getUserByUsername(username);
//         const cart = userData.cart;
//         const checkCartExist = cart.filter(book => book.bookId === bookId)
//         if (checkCartExist.length != 0) {
//             // console.log('trùng');
//             return {
//                 error_code: 0,
//                 message: "BookId is existed",
//                 data: "SUCCESS"
//             }
//         }
//         cart.push(bookCart);
//         const newUser = { ...userData, cart: cart }
//         // console.log('newUser', newUser);
//         const result = await UserBiz.updateUserByUsername(username, newUser);
//         res.sendJSON(result);
//     } catch (error) {
//         next(error)
//     }
// }