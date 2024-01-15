const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// GET contacts by id or favoriteColor
router.get('/', contactController.homePage);

// GET contacts by id or favoriteColor
router.get('/contacts/:param?', contactController.listContacts);

// POST a new contact
router.post('/contacts', contactController.addContact);

// PUT update contact by id
router.put('/contacts/:id', contactController.updateContact);

// DELETE contact by id
router.delete('/contacts/:id', contactController.deleteContact);

// Swagger UI
router.use('/', require('./swagger'));

module.exports = router;
