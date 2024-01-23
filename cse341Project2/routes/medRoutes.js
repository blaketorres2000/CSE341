const express = require('express');
const router = express.Router();
const medController = require('../controllers/medController');
const medGetController = require('../controllers/medGetController');
const medUsageController = require('../controllers/medUsageController')
const { validate, handleValidationErrors } = require('../middleware/validationMiddleware')

// GET all meds
router.get('/', medGetController.listAllMeds);

// Add a new med
router.post('/', validate('addMed'), handleValidationErrors, medController.addMed);

// GET med by id
router.get('/:id', validate('getMedById'), handleValidationErrors, medGetController.getMedById);

// Update a med
router.put('/:id', validate('updateMed'), handleValidationErrors, medController.updateMed);

// DELETE a med
router.delete('/:id', validate('deleteMed'), handleValidationErrors, medController.deleteMed);

// GET med by name
router.get('/:name', validate('getMedByName'), handleValidationErrors, medGetController.getMedByName);

// GET med usage by date
router.get('/:date', validate('getUsage'), handleValidationErrors, medUsageController.getMedUsageByDate);

// Log usage of a med by id
router.post('/log/:id', validate('logUsage'), handleValidationErrors, medUsageController.logUsage)

module.exports = router;