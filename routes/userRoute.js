const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', userController.getIndex);

router.post('/', userController.postAddItem);

module.exports = router;