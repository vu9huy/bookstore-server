const uploadFileFunc = require('../../common/utils/presignedUrl')

exports.uploadFile = async (req, res, next) => {
    const name = req.query.name;
    try {
        const result = await uploadFileFunc(name);
        // console.log('name', name);
        // res.json("ok");
        res.sendJSON(result);
    } catch (error) {
        next(error)
    }
}


