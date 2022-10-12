const { UnAuthorized, Forbidden } = require('../../common/error/custom.error');
const { verifyAcessToken } = require('../../common/jwt');

exports.requireAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) throw UnAuthorized;
        if (!verifyAcessToken(token)) throw UnAuthorized;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw Forbidden;
        }
        next(error);
    }
};
