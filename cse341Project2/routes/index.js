const express = require('express');
const router = express.Router();
const medController = require('../controllers/index');
const medRoutes = require('./medRoutes');

// Route to serve home message
router.get('/', medController.homePage);

// Route to allow med routes to be served from /meds
router.use('/meds', medRoutes);

module.exports = router;