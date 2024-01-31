const express = require('express');
const router = express.Router();
const { validate, handleValidationErrors } = require('../middleware/validationMiddleware')
const { isAuthenticated } = require("../middleware/authenticate");
const medUsageController = require('../controllers/medUsageController')

// GET med usage by date from the database's medUsage collection
router.get('/byDate/:date', validate('getUsage'), handleValidationErrors, medUsageController.getMedUsageByDate);

// GET med usage by id from the database's medUsage collection
router.get('/byId/:id', validate('getUsageById'), handleValidationErrors, medUsageController.getMedUsageById);

// Log usage of a med by id in the database's medUsage collection
router.post('/:id', isAuthenticated, validate('logUsage'), handleValidationErrors, medUsageController.logUsage);

// Update med usage by object _id in the database's medUsage collection
router.put('/:id', isAuthenticated, validate('updateUsage'), handleValidationErrors, medUsageController.updateMedUsage);

// DELETE med usage by object _id from the database's medUsage collection
router.delete('/:id', isAuthenticated, validate('deleteUsage'), handleValidationErrors, medUsageController.deleteMedUsage);

module.exports = router;
