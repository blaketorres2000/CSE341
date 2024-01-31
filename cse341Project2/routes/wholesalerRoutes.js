const express = require("express");
const router = express.Router();
const wholesalerController = require('../controllers/wholesalerController');
const { validate, handleValidationErrors } = require('../middleware/validationMiddleware');
const { isAuthenticated } = require("../middleware/authenticate");

// GET all wholesalers
router.get('/', handleValidationErrors, wholesalerController.getAllWholesalerPricing);

// Add a new wholesaler to the database
router.post('/', isAuthenticated, validate('addWholesaler'), handleValidationErrors, wholesalerController.addWholesaler);

// GET wholesaler by id from the database
router.get('/:id', validate('getWholesalerById'), handleValidationErrors, wholesalerController.getWholesalerPricingByMedId);

// Update a wholesaler in the database
router.put('/:id', isAuthenticated, validate('updateWholesaler'), handleValidationErrors, wholesalerController.updateWholesaler);

// DELETE a wholesaler from the database
router.delete('/:id', isAuthenticated, validate('deleteWholesaler'), handleValidationErrors, wholesalerController.deleteWholesaler);

module.exports = router;