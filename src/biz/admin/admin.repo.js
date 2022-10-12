const Admin = require('./Admin');

/**
 *
 * @param {string} adminName
 * @returns {object}
 */

exports.createAdmin = async (admin) => await Admin.create(admin);

exports.findOneUserByAdminName = async (adminName) => await Admin.findOne({ adminName }).lean();

