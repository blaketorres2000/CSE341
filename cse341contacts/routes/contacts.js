const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { validate, handleValidationErrors } = require('../validationMiddleware');

// GET all contacts
router.get('/', contactController.listContacts);

// GET contacts by id or favoriteColor
router.get('/:param?', validate('getContact'), handleValidationErrors, contactController.listContacts);

// POST a new contact with validation
router.post('/', validate('addContact'), handleValidationErrors, contactController.addContact);

// PUT update contact by id with validation
router.put('/:id', validate('updateContact'), handleValidationErrors, contactController.updateContact);

// DELETE contact by id with validation
router.delete('/:id', validate('deleteContact'), handleValidationErrors, contactController.deleteContact);

module.exports = router;