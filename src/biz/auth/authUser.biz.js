const JWT = require('../../common/jwt');
const ErrorCustomizer = require('../../common/error/custom.error');
const { createUser, getUserByEmail, updateUserByUsername, getUserByUsername } = require('../user/User.biz');
const { createSalt, validatePassword, hashPashword } = require('../../common/helper');
const { STATUS_USER } = require('../user/User.type');
const { sendMailVerify } = require('../../services/nodemailerService/nodemailer');

/**
 *
 * @param {string} username
 * @param {string} password
 * @returns
 */

exports.register = async (username, password, email, avatarUrl) => {
    const user = await getUserByUsername(username);
    if (user) throw ErrorCustomizer.Forbidden;

    const salt = createSalt();
    const hashPassword = hashPashword(password, salt);
    const payload = {
        email: email
    }
    const verifyEmailToken = JWT.createVerifyEmailToken(payload)

    const newUser = {
        username,
        password: hashPassword,
        email: email,
        avatarUrl: avatarUrl,
        emailVerified: false,
        verifyEmailToken: verifyEmailToken,
        salt: salt,
        phone: '',
        gender: '',
        birthday: null,
        status: STATUS_USER.ACTIVE,
        cart: [],
        noti: [],
        order: [],
        address: {
            country: '',
            city: '',
            zipCode: '',
            detailAddress: '',
        },
        phone: ''
    }
    // console.log(newUser);
    const response = await createUser(newUser);
    await sendMailVerify(username, email, verifyEmailToken);
    return response;
}


exports.verify = async (jwt) => {
    if (!JWT.verifyJWTEmailToken(jwt)) throw ErrorCustomizer.UnAuthorized;
    const payload = JWT.decode(jwt);

    const email = payload.email;
    const user = await getUserByEmail(email);
    if (!user) throw ErrorCustomizer.Forbidden;
    if (user.emailVerified) {
        return
    }
    if (jwt !== user.verifyEmailToken) throw ErrorCustomizer.UnAuthorized;

    const newUser = { ...user, emailVerified: true, verifyEmailToken: '' }
    const username = user.username;
    // console.log(newUser);
    const response = await updateUserByUsername(username, newUser);
    return response;
}



exports.login = async (username, password) => {
    const isEmail = username.includes("@");
    const user = isEmail ? await getUserByEmail(username) : await getUserByUsername(username);

    // console.log('isEmail', isEmail);
    // console.log('username', username);

    if (!user) throw ErrorCustomizer.UnAuthorized;

    if (!validatePassword(user.password, user.salt, password)) throw ErrorCustomizer.UnAuthorized;

    if (!user.emailVerified) {
        const payload = {
            email: user.email
        }
        const verifyEmailToken = JWT.createVerifyEmailToken(payload);
        const newUser = { verifyEmailToken: verifyEmailToken }
        const response = await updateUserByUsername(username, newUser);
        await sendMailVerify(username, user.email, verifyEmailToken);
        return {
            email: user.email
        }
    }
    const payload = {
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl,
        quantityCart: user.cart.length
    }

    const refreshToken = JWT.createRefreshToken(payload);
    const accessToken = JWT.createAccessToken(payload);

    const response = {
        refresh_token: refreshToken,
        access_token: accessToken,
    };
    return response;
}




/**
 *
 * @param {string} token
 */

exports.refreshToken = async (token) => {
    if (JWT.verifyRefreshToken(token)) {
        let payload = JWT.decode(token);
        payload = {
            username: payload.username,
            role: payload.role,
        };
        const refreshToken = JWT.createRefreshToken(payload);
        const accessToken = JWT.createAccessToken(payload);

        const response = {
            refresh_token: refreshToken,
            access_token: accessToken,
        };
        return response;
    }
    // handle force kick logout
    throw ErrorCustomizer.UnAuthorized;
};
