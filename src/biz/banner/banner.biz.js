const BannerRepo = require('./banner.repo');
const { SUCCESS } = require('../../common/response.message');

exports.createBanner = async (banner) => {
    await BannerRepo.createBanner(banner);
    return SUCCESS;
}

exports.getDetailBanner = async (id) => {
    const banner = await BannerRepo.findOneBannerById(id);
    if (!banner) throw NotFound;
    return banner;
}

exports.getListBanner = async (skip, limit) => {
    const list = await BannerRepo.findAllBanner(skip, limit);
    return list;
}

exports.updateBanner = async (id, banner) => {
    const result = await BannerRepo.updateOneBannebyId(id, banner);
    if (result.nModified === 0) throw UpdateFail;
    return SUCCESS;
}

exports.deleteBanner = async (id) => {
    const result = await BannerRepo.deleteOneBanneById(id);
    if (result.deletedCount === 0) throw DeleteFail;
    return SUCCESS;
};

