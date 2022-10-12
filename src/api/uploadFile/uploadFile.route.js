const express = require('express');
const uploadFileController = require('./uploadFile.controller');
const { requireAuth } = require('../auth/auth.middleware');

const router = express.Router();

router.get('/', uploadFileController.uploadFile);

module.exports = router;
