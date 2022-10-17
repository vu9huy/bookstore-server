const User = require('./User');
const { STATUS_USER } = require('./User.type');

/**
 *
 * @param {string} username
 * @returns {object}
 */

exports.createUser = async (user) => await User.create(user);

exports.findOneUserByUsername = async (username) => await User.findOne({ username, status: STATUS_USER.ACTIVE }).lean();

exports.editOneUserByUsername = async (username, newUser) => await User.findOneAndUpdate({ username: username }, newUser);

exports.findOneUserByEmail = async (email) => await User.findOne({ email, status: STATUS_USER.ACTIVE }).lean();

