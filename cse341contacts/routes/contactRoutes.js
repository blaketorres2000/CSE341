const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// GET contacts by id or favoriteColor
router.get('/', contactController.homePage);

// GET contacts by id or favoriteColor
router.get('/contacts/:param?', contactController.listContacts);

// POST a new contact
router.post('/contacts', contactController.addContact);

module.exports = router;
