const { findOneUserByUsername, createUser, findOneUserByEmail, editOneUserByUsername } = require('./User.repo');
const { SUCCESS } = require('../../common/response.message')

exports.createUser = async (user) => {
    const response = await createUser(user);
    return response;
}

exports.getUserByUsername = async (username) => {
    if (!username) return null;
    return findOneUserByUsername(username);
}

exports.getUserByEmail = async (email) => {
    if (!email) return null;
    return findOneUserByEmail(email);
}

exports.updateUserByUsername = async (username, newUser) => {
    const result = await editOneUserByUsername(username, newUser);
    if (result.nModified === 0) throw UpdateFail;
    return SUCCESS;
}

