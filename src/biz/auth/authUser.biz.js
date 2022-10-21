const JWT = require('../../common/jwt');
const ErrorCustomizer = require('../../common/error/custom.error');
const { createUser, getUserByEmail, updateUserByUsername, getUserByUsername } = require('../user/User.biz');
const { createSalt, validatePassword, hashPashword } = require('../../common/helper');
const { STATUS_USER } = require('../user/User.type');
const { sendMailVerify } = require('../../services/nodemailerService/nodemailer');
const axios = require('axios');

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

exports.loginWithGoogle = async (accessTokenGoogle) => {
    try {
        const responseByGoogle = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                "Authorization": `Bearer ${accessTokenGoogle}`
            }
        })
        const userDataRaw = responseByGoogle.data;
        // const userDataRaw = {
        //     email: "gaaravu@gmail.com",
        //     email_verified: true,
        //     family_name: "Vu",
        //     given_name: "Quan",
        //     locale: "vi",
        //     name: "Quan Vu",
        //     picture: "https://lh3.googleusercontent.com/a/ALm5wu1779vj1JOfrRHZSX9mR2hsV1ohYjipUZ2C77GQCw=s96-c",
        //     sub: "103983929699061542442"
        // }
        const emailUser = userDataRaw.email;
        const userData = {
            username: emailUser.substring(0, emailUser.indexOf('@gmail.com')),
            email: userDataRaw.email,
            avatarUrl: userDataRaw.picture,
            name: userDataRaw.name
        }
        const userByEmail = await getUserByEmail(userData.email);
        // console.log('userByEmail', userByEmail);
        if (userByEmail) {
            const newUser = { ...userByEmail, emailVerified: true, verifyEmailToken: '' };
            const responseUpdateUser = await updateUserByUsername(userByEmail.username, newUser);
        }
        if (!userByEmail) {
            const userByUsername = await getUserByUsername(userData.username);
            var username;
            const randomNumber = Math.floor(10000 + Math.random() * 90000);
            if (userByUsername) {
                username = `${userData.username}-${randomNumber}`
            } else {
                username = userData.username
            }
            const salt = createSalt();
            const randomNumber1 = Math.floor(10000 + Math.random() * 90000);
            const hashPassword = hashPashword('a1234567', salt);

            const newUser = {
                username: username,
                password: hashPassword,
                email: userData.email,
                avatarUrl: userData.avatarUrl,
                emailVerified: true,
                verifyEmailToken: '',
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
            const responseCreateUser = await createUser(newUser);
            // console.log('responseCreateUser:', responseCreateUser);
        }

        const user = await getUserByEmail(userData.email);
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

    } catch (error) {
        console.log(error);
    }
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
