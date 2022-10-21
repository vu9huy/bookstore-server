const express = require('express');
const { validate } = require('express-validation');
const AuthController = require('./auth.controller');
const { login, refreshToken, register } = require('./auth.validator');

const router = express.Router();

// router.post('/register', validate(register, { context: true }), AuthController.register);
router.post('/user/register', AuthController.registerUser);
router.post('/user/verify', AuthController.verifyUser);
router.put('/user/edituser', AuthController.editUserData);
router.get('/user/getuser', AuthController.getUserByToken);
router.post('/user/login-google', AuthController.loginUserWithGmail);
router.post('/user/login', validate(login, { context: true }), AuthController.loginUser);
router.post('/user/refresh-token', validate(refreshToken, { context: true }), AuthController.refreshTokenUser);

// router.post('/admin/register', AuthController.registerAdmin);
// router.post('/admin/login', AuthController.loginAdmin);
// router.post('/admin/refresh-token', AuthController.refreshTokenAdmin);

module.exports = router;
