const Display = require('./Display');

exports.createDisplay = async (display) => await Display.create(display);

exports.findAllDisplays = async (skip, limit) => await Display.find().skip(skip).limit(limit).lean();

exports.findDisplaysByListIds = async (skip, limit, listIds) => await Display.find({ _id: { $in: listIds } }).skip(skip).limit(limit).lean();

exports.findOneDisplayById = async (id) => await Display.findById(id).lean();

exports.updateOneDisplaybyId = async (id, display) => await Display.findByIdAndUpdate(id, display);

exports.deleteOneDisplayById = async (id) => await Display.findByIdAndDelete(id);


