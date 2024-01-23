const express = require('express');
const router = express.Router();
const medController = require('../controllers/');
const medRoutes = require('./medRoutes');

// Define routes directly
router.get('/', medController.homePage);
router.use('/meds', medRoutes);

module.exports = router;