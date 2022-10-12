const BannerBiz = require('../../biz/banner/banner.biz');

exports.createBanner = async (req, res, next) => {
    const banner = req.body;
    try {
        const result = await BannerBiz.createBanner(banner);
        res.sendJSON(result);
    } catch (error) {
        next(error)
    }
}

exports.getDetailBanner = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await BannerBiz.getDetailBanner(id);
        res.sendJSON(result);
    } catch (error) {
        next(error);
    }
};

exports.getListBanner = async (req, res, next) => {
    const { skip, limit } = req.query;

    try {
        const result = await BannerBiz.getListBanner(Number(skip), Number(limit));
        res.sendJSON(result);
    } catch (error) {
        next(error)
    }
}

exports.updateBanner = async (req, res, next) => {
    const { id } = req.params;
    const banner = req.body;
    try {
        const result = await BannerBiz.updateBanner(id, banner);
        res.sendJSON(result);
    } catch (error) {
        next(error);
    }
};

exports.deleteBanner = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await BannerBiz.deleteBanner(id);
        res.sendJSON(result);
    } catch (error) {
        next(error);
    }
};
