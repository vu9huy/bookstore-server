exports.toDetailResponse = (displayModel) => ({
    displayId: displayModel._id,
    name: displayModel.name,
    listBook: displayModel.listBook,
    displayType: displayModel.displayType,
});

exports.toListResponse = (displayModels) => displayModels.map((displayModel) => ({
    displayId: displayModel._id,
    name: displayModel.name,
    listBook: displayModel.listBook,
    displayType: displayModel.displayType,
}));