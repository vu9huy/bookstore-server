const express = require('express');
const { validate } = require('express-validation');
const BannerController = require('./banner.controller');
// const { create, list } = require('./banner.validator');
const { requireAuth } = require('../auth/auth.middleware');

const router = express.Router();

router.get('/', BannerController.getListBanner);
router.get('/:id', BannerController.getDetailBanner);
router.post('/', BannerController.createBanner);
router.put('/:id', BannerController.updateBanner);
router.delete('/:id', BannerController.deleteBanner);


module.exports = router;
