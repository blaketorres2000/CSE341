const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// GET all contacts or a specific contact by ID
router.get('/:id?', contactController.listContacts);

// POST a new contact
router.post('/', contactController.addContact);

module.exports = router;
