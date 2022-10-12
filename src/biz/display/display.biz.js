const displayRepo = require('./display.repo');
const { SUCCESS } = require('../../common/response.message');

exports.createDisplay = async (display) => {
    await displayRepo.createDisplay(display);
    return SUCCESS;
}

exports.getDetailDisplay = async (id) => {
    const display = await displayRepo.findOneDisplayById(id);
    if (!display) throw NotFound;
    return display;
}

exports.getListDisplays = async (skip, limit) => {
    const list = await displayRepo.findAllDisplays(skip, limit);
    return list;
}



exports.updateDisplay = async (id, display) => {
    const result = await displayRepo.updateOneDisplaybyId(id, display);
    if (result.nModified === 0) throw UpdateFail;
    return SUCCESS;
}

exports.deleteDisplay = async (id) => {
    const result = await displayRepo.deleteOneDisplayById(id);
    if (result.deletedCount === 0) throw DeleteFail;
    return SUCCESS;
};


