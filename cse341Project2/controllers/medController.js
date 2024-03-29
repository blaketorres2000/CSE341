const { Med } = require("../models/");
const mongoose = require("mongoose");

const medController = {};

/*******************************************************
 * Function to get meds from the database
 ******************************************************/
medController.addMed = async function (req, res) {
  //swagger.tags = ['Meds']
  //swagger.description = ['This is to add a new medication to the database.']

  try {
    const {
      medName,
      medStrength,
      medUnit,
      medClass,
      medInventory,
      medThreshold,
    } = req.body;

    const newMed = new Med({
      medName,
      medStrength,
      medUnit,
      medClass,
      medInventory,
      medThreshold,
    });

    const savedMed = await newMed.save();

    res
      .status(201)
      .json({
        message: `${savedMed.medName} ${savedMed.medStrength} has been added successfully!`,
      });
  } catch (err) {
    console.error(`Error adding medication`), err;
    res
      .status(500)
      .json({ error: "Internal Server Error." });
      console.log("Error adding medication:", err);
  }
};

/*******************************************************
 * Function to update a medication by id in the database
 ******************************************************/
medController.updateMed = async function (req, res) {
  //swagger.tags = ['Meds']
  //swagger.description = ['This is to update a new medication in the database.']

  try {
    const medId = req.params.id;
    const {
      medName,
      medStrength,
      medUnit,
      medClass,
      medInventory,
      medThreshold,
    } = req.body;

    // Ensure that the medId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(medId)) {
      return res
        .status(400)
        .json({ error: "Invalid medication ID." });
    }

    // Create an object with the fields to be updated
    const updateFields = {
      medName,
      medStrength,
      medUnit,
      medClass,
      medInventory,
      medThreshold,
    };

    const updatedMed = await Med.findByIdAndUpdate(medId, updateFields, {
      new: true,
    });

    if (!updatedMed) {
      return res
        .status(404)
        .json({ error: "Medication not found." });
    }

    res
      .status(201)
      .json({
        message: `${updatedMed.medName} ${updatedMed.medStrength} has been updated successfully!`,
      });
  } catch (err) {
    console.error("Error updating medication:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error." });
  }
};

/*******************************************************
 * Function to delete a medication by id from database
 ******************************************************/
medController.deleteMed = async function (req, res) {
  //swagger.tags = ['Meds']
  //swagger.description = ['This is to delete a medication from the database.']

  try {
    const medId = req.params.id;

    // Ensure that the medId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(medId)) {
      return res
        .status(400)
        .json({ error: "Invalid medication ID." });
    }

    const deletedMed = await Med.findByIdAndDelete(medId);

    if (!deletedMed) {
      return res
        .status(404)
        .json({ error: "Medication not found." });
    }

    res
      .status(201)
      .json({
        message: `${deletedMed.medName} ${deletedMed.medStrength} has been deleted successfully`,
      });
  } catch (err) {
    console.error(`Error deleting medication:`, err);
    res
      .status(500)
      .json({ error: "Internal Server Error." });
  }
};

module.exports = medController;
