const jwt = require('jsonwebtoken');
const { ACCESS_KEY, REFRESH_KEY, VERIFY_EMAIL_KEY } = require('../config/environment');

const EXPIRE_ACCESS_TOKEN = '1h';
const EXPIRE_REFRESH_TOKEN = '1y';
const EXPIRE_VERIFY_EMAIL_TOKEN = '15m';

/**
 *
 * @param {object} payload
 * @param {string} secretKey
 * @param {string} expiresTime
 */
const sign = (payload, secretKey, expiresTime) => {
    const opts = {
        algorithm: 'HS256',
        expiresIn: expiresTime,
        issuer: 'backend-node',
    };
    return jwt.sign(payload, secretKey, opts);
};

exports.verifyAcessToken = (token) => jwt.verify(token, ACCESS_KEY);
exports.verifyRefreshToken = (token) => jwt.verify(token, REFRESH_KEY);
exports.verifyJWTEmailToken = (token) => jwt.verify(token, VERIFY_EMAIL_KEY);

exports.decode = (token) => jwt.decode(token);

/**
 *
 * @param {object} payload
 */
exports.createRefreshToken = (payload) => sign(payload, REFRESH_KEY, EXPIRE_REFRESH_TOKEN);

exports.createAccessToken = (payload) => sign(payload, ACCESS_KEY, EXPIRE_ACCESS_TOKEN);

exports.createVerifyEmailToken = (payload) => sign(payload, VERIFY_EMAIL_KEY, EXPIRE_VERIFY_EMAIL_TOKEN);
