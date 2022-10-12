const express = require('express');
const authRoutes = require('./auth/auth.route');
const bookRoutes = require('./book/book.route');
const uploadFileRoutes = require('./uploadFile/uploadFile.route');
const bannerRoutes = require('./banner/banner.route');
const cartRoutes = require('./cart/cart.route');
const displayRoutes = require('./display/display.route');
const router = express.Router();

router.get('/status', (req, res) => res.send('OK'));
router.use('/api/v1', authRoutes);
router.use('/api/v1/books', bookRoutes);
router.use('/api/v1/banners', bannerRoutes);
router.use('/api/v1/upload-image', uploadFileRoutes);
router.use('/api/v1/carts', cartRoutes);
router.use('/api/v1/displays', displayRoutes);


module.exports = router;
