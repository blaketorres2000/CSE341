const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const contactsRoutes = require('./contacts');

// Define routes directly
router.get('/', contactController.homePage);
router.use('/contacts', contactsRoutes);

module.exports = router;