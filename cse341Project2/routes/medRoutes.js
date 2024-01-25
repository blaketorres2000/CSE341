const express = require('express');
const router = express.Router();
const medController = require('../controllers/medController');
const medGetController = require('../controllers/medGetController');
const medUsageController = require('../controllers/medUsageController')
const { validate, handleValidationErrors } = require('../middleware/validationMiddleware')

// GET all meds
router.get('/', medGetController.listAllMeds);

// Add a new med to the database's medList collection
router.post('/', validate('addMed'), handleValidationErrors, medController.addMed);

// GET med by id from the database's medList collection
router.get('/:id', validate('getMedById'), handleValidationErrors, medGetController.getMedById);

// GET med by name from the database's medList collection
router.get('/name/:name', validate('getMedByName'), handleValidationErrors, medGetController.getMedByName);

// Update a med in the database's medList collection
router.put('/:id', validate('updateMed'), handleValidationErrors, medController.updateMed);

// DELETE a med from the database's medList collection
router.delete('/:id', validate('deleteMed'), handleValidationErrors, medController.deleteMed);

// Log usage of a med by id in the database's medUsage collection
router.post('/usage/:id', validate('logUsage'), handleValidationErrors, medUsageController.logUsage);

// GET med usage by date from the database's medUsage collection
router.get('/usageByDate/:date', validate('getUsage'), handleValidationErrors, medUsageController.getMedUsageByDate);

// GET med usage by id from the database's medUsage collection
router.get('/usageById/:id', validate('getUsageById'), handleValidationErrors, medUsageController.getMedUsageById);

module.exports = router;