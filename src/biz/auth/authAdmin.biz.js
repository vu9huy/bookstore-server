const JWT = require('../../common/jwt');
const ErrorCustomizer = require('../../common/error/custom.error');
const AdminBiz = require('../admin/admin.biz');
const { createSalt, validatePassword, hashPashword } = require('../../common/helper');

/**
 *
 * @param {string} adminName
 * @param {string} password
 * @returns
 */

exports.register = async (adminName, password) => {
    const admin = await AdminBiz.getAdminByAdminName(adminName);
    if (admin) throw ErrorCustomizer.Forbidden;

    const salt = createSalt();
    const hashPassword = hashPashword(password, salt);

    const newAdmin = {
        adminName,
        password: hashPassword,
        salt: salt,
    }
    // console.log(newAdmin);
    const response = await AdminBiz.createAdmin(newAdmin);
    return response;
}

exports.login = async (adminName, password) => {
    const admin = await AdminBiz.getAdminByAdminName(adminName);

    if (!admin) throw ErrorCustomizer.UnAuthorized;
    if (!validatePassword(admin.password, admin.salt, password)) throw ErrorCustomizer.UnAuthorized;

    const payload = {
        adminName: admin.adminName
    }

    const refreshToken = JWT.createRefreshToken(payload);
    const accessToken = JWT.createAccessToken(payload);

    const response = {
        refresh_token: refreshToken,
        access_token: accessToken,
    };
    return response;
};

/**
 *
 * @param {string} token
 */

exports.refreshToken = async (token) => {
    if (JWT.verifyRefreshToken(token)) {
        let payload = JWT.decode(token);
        payload = {
            adminName: payload.adminName,
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
