const express = require('express');
const router = express.Router();
const { validate, handleValidationErrors } = require('../middleware/validationMiddleware')
const { isAuthenticated } = require("../middleware/authenticate");
const medUsageController = require('../controllers/medUsageController')

// Log usage of a med by id in the database's medUsage collection
router.post('/:id', isAuthenticated, validate('logUsage'), handleValidationErrors, medUsageController.logUsage);

// GET med usage by date from the database's medUsage collection
router.get('/byDate/:date', validate('getUsage'), handleValidationErrors, medUsageController.getMedUsageByDate);

// GET med usage by id from the database's medUsage collection
router.get('/byId/:id', validate('getUsageById'), handleValidationErrors, medUsageController.getMedUsageById);

// Update med usage by id and date in the database's medUsage collection
router.put('/:id/:date', isAuthenticated, validate('logUsage'), handleValidationErrors, medUsageController.updateMedUsage);

// DELETE med usage by id and date from the database's medUsage collection
router.delete('/:id/:date', isAuthenticated, validate('deleteUsage'), handleValidationErrors, medUsageController.deleteMedUsage);

module.exports = router;
