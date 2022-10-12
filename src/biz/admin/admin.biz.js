const AdminRepo = require('./admin.repo');
const { SUCCESS } = require('../../common/response.message');

exports.createAdmin = async (admin) => {
    await AdminRepo.createAdmin(admin);
    return SUCCESS;
}

exports.getAdminByAdminName = async (adminName) => {
    if (!adminName) return null;
    return AdminRepo.findOneUserByAdminName(adminName);
}

