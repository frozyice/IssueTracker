const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.get('/', adminController.getAdminPage);

router.get('/remove/:id', adminController.completeItem);

module.exports = router;
