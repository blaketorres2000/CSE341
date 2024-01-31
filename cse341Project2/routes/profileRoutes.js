const profile = require("../controllers/profileController");
const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const { validate, handleValidationErrors } = require("../middleware/validationMiddleware");

// Route to get all user profiles
router.get("/", profile.getAllProfiles);

// Route to update the user's profile
router.put("/", validate('updateProfile'), handleValidationErrors, profileController.updateUserProfile);

module.exports = router;