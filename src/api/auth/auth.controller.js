const AuthUserBiz = require('../../biz/auth/authUser.biz');
const AuthAdminBiz = require('../../biz/auth/authAdmin.biz');


exports.registerUser = async (req, res, next) => {
    const { username, password, email, avatarUrl } = req.body;
    try {
        const result = await AuthUserBiz.register(username, password, email, avatarUrl);
        res.sendJSON(result);
    } catch (error) {
        next(error)
    }
}

exports.verifyUser = async (req, res, next) => {
    const { jwt } = req.body;
    try {
        const result = await AuthUserBiz.verify(jwt);
        res.sendJSON(result);
    } catch (error) {
        next(error)
    }
}


exports.loginUser = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const result = await AuthUserBiz.login(username, password);
        res.sendJSON(result);
    } catch (error) {
        next(error);
    }
};


exports.refreshTokenUser = async (req, res, next) => {
    const { refresh_token: token } = req.body;
    try {
        const result = await AuthUserBiz.refreshToken(token);
        res.sendJSON(result);
    } catch (error) {
        next(error);
    }
};


exports.registerAdmin = async (req, res, next) => {
    const { adminName, password } = req.body;
    try {
        const result = await AuthAdminBiz.register(adminName, password);
        res.sendJSON(result);
    } catch (error) {
        next(error)
    }
}

exports.loginAdmin = async (req, res, next) => {
    const { adminName, password } = req.body;
    try {
        const result = await AuthAdminBiz.login(adminName, password);
        res.sendJSON(result);
    } catch (error) {
        next(error);
    }
};


exports.refreshTokenAdmin = async (req, res, next) => {
    const { refresh_token: token } = req.body;
    try {
        const result = await AuthAdminBiz.refreshToken(token);
        res.sendJSON(result);
    } catch (error) {
        next(error);
    }
};