const express = require('express');
const CartController = require('./cart.controller');
const { requireAuth } = require('../auth/auth.middleware');
const router = express.Router();

router.get('/', requireAuth, CartController.getCart);
router.put('/add', requireAuth, CartController.addBookToCart);
router.put('/remove', requireAuth, CartController.removeBookToCart);


module.exports = router;

