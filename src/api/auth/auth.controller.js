const AuthUserBiz = require('../../biz/auth/authUser.biz');
const AuthAdminBiz = require('../../biz/auth/authAdmin.biz');
const { decode } = require('../../common/jwt');
const { getUserByUsername, updateUserByUsername } = require('../../biz/user/User.biz');
const UserBiz = require('../../');

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

exports.loginUserWithGmail = async (req, res, next) => {
    const { accessTokenGoogle } = req.body;
    try {
        const result = await AuthUserBiz.loginWithGoogle(accessTokenGoogle);
        res.sendJSON(result);
    } catch (error) {
        next(error);
    }


}

exports.getUserByToken = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        const payload = decode(token);
        const { username } = payload;
        const userDataRaw = await getUserByUsername(username);
        const userData = {
            username: userDataRaw.username,
            email: userDataRaw.email,
            gender: userDataRaw.gender,
            avatarUrl: userDataRaw.avatarUrl,
            address: userDataRaw.address,
            birthday: userDataRaw.birthday,
            phone: userDataRaw.phone,
        }
        res.sendJSON(userData);
    } catch (error) {
        next(error)
    }
}


exports.editUserData = async (req, res, next) => {
    const userDataEdit = req.body;
    const token = req.headers.authorization;
    try {
        const payload = decode(token);
        const { username } = payload;
        const userData = await getUserByUsername(username);
        const newUser = { ...userData, ...userDataEdit };
        console.log('userData', userData);
        console.log('userDataEdit', userDataEdit);
        console.log('newUser', newUser);

        const result = await updateUserByUsername(username, newUser);
        res.sendJSON(result);
    } catch (error) {
        next(error)
    }
}



exports.refreshTokenUser = async (req, res, next) => {
    const { refresh_token: token } = req.body;
    try {
        const result = await AuthUserBiz.refreshToken(token);
        res.sendJSON(result);
    } catch (error) {
        next(error);
    }
};


// exports.registerAdmin = async (req, res, next) => {
//     const { adminName, password } = req.body;
//     try {
//         const result = await AuthAdminBiz.register(adminName, password);
//         res.sendJSON(result);
//     } catch (error) {
//         next(error)
//     }
// }

// exports.loginAdmin = async (req, res, next) => {
//     const { adminName, password } = req.body;
//     try {
//         const result = await AuthAdminBiz.login(adminName, password);
//         res.sendJSON(result);
//     } catch (error) {
//         next(error);
//     }
// };


exports.refreshTokenAdmin = async (req, res, next) => {
    const { refresh_token: token } = req.body;
    try {
        const result = await AuthAdminBiz.refreshToken(token);
        res.sendJSON(result);
    } catch (error) {
        next(error);
    }
};