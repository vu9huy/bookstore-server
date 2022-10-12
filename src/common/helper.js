const sha1 = require('sha1');
const md5 = require('md5');

/**
 *
 * @param {string} password
 * @param {string} salt
 * @param {string} passwordInput
 * @returns {boolean}
 */
exports.validatePassword = (password, salt, passwordInput) => password === sha1(md5(passwordInput) + salt);

exports.hashPashword = (passwordInput, salt) => sha1(md5(passwordInput) + salt)

exports.createSalt = () => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 8; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};


