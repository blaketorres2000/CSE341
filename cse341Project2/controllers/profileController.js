const { User } = require("../models/");
const mongoose = require("mongoose");

profileController = {};

/*********************************************************
 * Function to get a list of all user profiles from the database.
 ********************************************************/
profileController.getAllProfiles = async function (req, res) {
  //swagger.tags = ['Profile Management']
  //swagger.description = ['This is to get a list of all user profiles from the database.']
  try {
    const profiles = await User.find({});
    return res.json(profiles);
  } catch (err) {
    console.error("Error fetching medications:", err);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

/*********************************************************
 * Function to update the user's profile
 *********************************************************/
profileController.updateUserProfile = async function (req, res) {
  try {
    const githubUserId = req.params;
    const { displayName, email } = req.body;

    updateFields = {
      displayName,
      email,
    };

    const updatedProfile = await User.findOneAndUpdate(
      githubUserId,
      updateFields,
      {
        new: true,
      }
    );

    if (updatedProfile) {
      res.json({ message: `${updatedProfile.displayName} has been updated successfully!`, });
    } else {
      res.status(404).json({ error: "User profile not found." });
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

module.exports = profileController;
