const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// GET contacts by id or favoriteColor
router.get('/', contactController.listContacts);

// GET contacts by id or favoriteColor
router.get('/:param?', contactController.listContacts);

// POST a new contact
router.post('/', contactController.addContact);

// PUT update contact by id
router.put('/:id', contactController.updateContact);

// DELETE contact by id
router.delete('/:id', contactController.deleteContact);

module.exports = router;