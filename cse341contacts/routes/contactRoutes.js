const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// GET contacts by id or favoriteColor
router.get('/:param?', contactController.listContacts);

// POST a new contact
router.post('/', contactController.addContact);

module.exports = router;
