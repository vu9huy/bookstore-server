const express = require('express');
// const { validate } = require('express-validation');
// const { create, list } = require('./display.validator');
const DisplayController = require('./display.controller');
const { requireAuth } = require('../auth/auth.middleware');

const router = express.Router();

router.get('/', DisplayController.getListDisplays);
router.get('/:id', DisplayController.getDetailDisplay);
router.post('/', DisplayController.createDisplay);
router.put('/:id', DisplayController.updateDisplay);
router.delete('/:id', DisplayController.deleteDisplay);


module.exports = router;

