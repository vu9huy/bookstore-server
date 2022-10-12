const DisplayBiz = require('../../biz/display/display.biz');
const DisplayTransform = require('./display.transform');

exports.createDisplay = async (req, res, next) => {
    const display = req.body;
    try {
        const result = await DisplayBiz.createDisplay(display);
        res.sendJSON(result);
    } catch (error) {
        next(error)
    }
}

exports.getDetailDisplay = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await DisplayBiz.getDetailDisplay(id);
        res.sendJSON(DisplayTransform.toDetailResponse(result));
    } catch (error) {
        next(error);
    }
};

exports.getListDisplays = async (req, res, next) => {
    const { skip, limit } = req.query;
    try {
        const result = await DisplayBiz.getListDisplays(Number(skip), Number(limit));
        res.sendJSON(DisplayTransform.toListResponse(result));
    } catch (error) {
        next(error)
    }
}



exports.updateDisplay = async (req, res, next) => {
    const { id } = req.params;
    const display = req.body;
    try {
        const result = await DisplayBiz.updateDisplay(id, display);
        res.sendJSON(result);
    } catch (error) {
        next(error);
    }
};

exports.deleteDisplay = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await DisplayBiz.deleteDisplay(id);
        res.sendJSON(result);
    } catch (error) {
        next(error);
    }
};



