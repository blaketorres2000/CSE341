const express = require('express');
const router = express.Router();
const medGetController = require('../controllers/medGetController');
const medController = require('../controllers/medController');

// GET all meds
router.get('/', medGetController.listAllMeds);

// GET med by id or name
router.get('/:param?', medGetController.getMedByParam);

// POST new med
router.post('/', medController.addMed);

// PUT update med
router.put('/:id', medController.updateMed);

// DELETE med
router.delete('/:id', medController.deleteMed);

module.exports = router;