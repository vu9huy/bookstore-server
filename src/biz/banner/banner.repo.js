const Banner = require('./Banner');

exports.createBanner = async (banner) => await Banner.create(banner);

exports.findAllBanner = async (skip, limit) => await Banner.find().skip(skip).limit(limit);

exports.findOneBannerById = async (id) => await Banner.findById(id).lean();

exports.updateOneBannebyId = async (id, banner) => await Banner.findByIdAndUpdate(id, banner);

exports.deleteOneBanneById = async (id) => await Banner.findByIdAndDelete(id);

