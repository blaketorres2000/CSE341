const express = require('express');
const router = express.Router();
const medController = require('../controllers/medController');
const medGetController = require('../controllers/medGetController');
const { validate, handleValidationErrors } = require('../middleware/validationMiddleware')
const { isAuthenticated } = require("../middleware/authenticate");

// GET all meds
router.get('/', medGetController.listAllMeds);

// Add a new med to the database's medList collection
router.post('/', isAuthenticated, validate('addMed'), handleValidationErrors, medController.addMed);

// GET med by id from the database's medList collection
router.get('/:id', validate('getMedById'), handleValidationErrors, medGetController.getMedById);

// GET med by name from the database's medList collection
router.get('/name/:name', validate('getMedByName'), handleValidationErrors, medGetController.getMedByName);

// Update a med in the database's medList collection
router.put('/:id', isAuthenticated, validate('updateMed'), handleValidationErrors, medController.updateMed);

// DELETE a med from the database's medList collection
router.delete('/:id', isAuthenticated, validate('deleteMed'), handleValidationErrors, medController.deleteMed);

module.exports = router;